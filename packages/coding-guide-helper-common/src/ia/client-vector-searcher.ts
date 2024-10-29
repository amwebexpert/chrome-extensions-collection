import { type FeatureExtractionPipeline, type Tensor, pipeline } from '@xenova/transformers'
import { collectOnlineGuidelines } from '../background/service-worker.utils'
import type { GuidelineNode } from '../models/models'
import { cosineSimilarity } from '../utils/llm.utils'
import { loadAllRules } from './guideline.collector'
import type { EmbeddingVector, Rule } from './models'

enum LlmModel {
  all_minilm_l6_v2 = 'Xenova/all-MiniLM-L6-v2',
  gte_small = 'Xenova/gte-small',
}

class FeatureExtractionEmbeddingsSearcher {
  rootNode: GuidelineNode | null = null

  featureExtractionEmbeddings: FeatureExtractionPipeline | null = null
  rules: Rule[] = []

  async init() {
    const rootNode = await collectOnlineGuidelines()
    if (!rootNode.children?.length) throw Error('Cannot load guidelines')

    this.rootNode = rootNode

    this.rules = loadAllRules(rootNode)

    const model = LlmModel.gte_small
    console.info(`====>>> loading feature-extraction pipeline for model ${model}...`)
    this.featureExtractionEmbeddings = await pipeline('feature-extraction', model)
    console.info('====>>> End loading feature-extraction pipeline.')

    console.info('====>>> Computing embeddings for all rules...')
    for (const rule of this.rules) {
      const tensor: Tensor = await this.featureExtractionEmbeddings(rule.content, {
        pooling: 'mean',
        normalize: false,
      })

      rule.embedding = Array.from(tensor.data as number[]).map((value) =>
        Number.parseFloat(value.toFixed(7)),
      )
    }

    console.info('END computing.')
  }

  findRelevantDocument = async (queryText: string) => {
    if (!this.featureExtractionEmbeddings) throw Error('Cannot compute embeddings')

    const tensor: Tensor = await this.featureExtractionEmbeddings(queryText, {
      pooling: 'mean',
      normalize: true,
    })
    const queryTextEmbedding = Array.from(tensor.data as number[]).map((value) =>
      Number.parseFloat(value.toFixed(7)),
    )

    let bestDoc: Rule | null = null
    let bestSimilarity = -1

    for (const rule of this.rules) {
      const similarity: number = cosineSimilarity(queryTextEmbedding, rule.embedding ?? [])
      if (similarity > bestSimilarity) {
        bestSimilarity = similarity
        bestDoc = rule
      }
    }

    return bestDoc
  }
}

export const featureExtractionEmbeddingsSearcher = new FeatureExtractionEmbeddingsSearcher()

export const isSemanticServiceAvailable = (): boolean => true

import { type FeatureExtractionPipeline, type Tensor, env, pipeline } from '@xenova/transformers'
import type { GuidelineNode } from '../models/models'
import { cosineSimilarity } from '../utils/llm.utils'
import { loadAllRules } from './guideline.collector'
import type { EmbeddingVector, Rule } from './models'

// skip initial check for local models, since we are not loading any local models.
env.allowLocalModels = false

// due to a bug in onnxruntime-web, we must disable multithreading for now.
// @see https://github.com/microsoft/onnxruntime/issues/14445 for more information.
env.backends.onnx.wasm.numThreads = 1

enum LlmModel {
  all_minilm_l6_v2 = 'Xenova/all-MiniLM-L6-v2',
  gte_small = 'Xenova/gte-small',
}

type RelevantDocumentsArgs = {
  queryTexts: string
  maxResults?: number
}

const tensorToEmbeddingVector = (tensor: Tensor): EmbeddingVector =>
  Array.from(tensor.data as number[]).map((v) => Number.parseFloat(v.toFixed(7)))

export const isSemanticServiceAvailable = (): boolean => true

export class FeatureExtractionEmbeddingsSearcher {
  featureExtractionEmbeddings: FeatureExtractionPipeline | null = null
  rules: Rule[] = []

  loadRules(rootNode?: GuidelineNode) {
    if (!rootNode?.children?.length) throw Error('Guidelines should be loaded first')
    this.rules = loadAllRules(rootNode)
  }

  async loadModel(model = LlmModel.all_minilm_l6_v2) {
    console.info(`====>>> model "${model}" feature-extraction pipeline creation...`)
    this.featureExtractionEmbeddings = await pipeline('feature-extraction', model)
  }

  async computeEmbeddings() {
    if (!this.featureExtractionEmbeddings) throw Error('Model should be loaded first')
    const createEmbedding = this.featureExtractionEmbeddings

    const embeddingPromises = this.rules.map(async (rule) => {
      console.info(`====>>> computing rule embeddings: ${rule.title}`)
      const tensor: Tensor = await createEmbedding(rule.content, {
        pooling: 'mean',
        normalize: false,
      })

      rule.embedding = tensorToEmbeddingVector(tensor)
    })

    await Promise.all(embeddingPromises)

    console.info('====>>> Computed embeddings for all rules...')
  }

  async init(rootNode?: GuidelineNode) {
    this.loadRules(rootNode)
    await this.loadModel(LlmModel.gte_small)
    await this.computeEmbeddings()
  }

  findRelevantDocument = async (queryText: string): Promise<Rule | null> => {
    if (!this.featureExtractionEmbeddings) throw Error('Cannot compute embeddings')

    const tensor: Tensor = await this.featureExtractionEmbeddings(queryText, {
      pooling: 'mean',
      normalize: true,
    })
    const queryTextEmbedding = tensorToEmbeddingVector(tensor)

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

  findRelevantDocuments = async (configs: RelevantDocumentsArgs): Promise<Rule[]> => {
    if (!this.featureExtractionEmbeddings) throw Error('Cannot compute embeddings')

    const { queryTexts, maxResults = 3 } = configs
    const tensor: Tensor = await this.featureExtractionEmbeddings(queryTexts, {
      pooling: 'mean',
      normalize: true,
    })
    const queryTextEmbedding = tensorToEmbeddingVector(tensor)

    const rules: Rule[] = this.rules
      .map((rule) => ({
        ...rule,
        similarity: cosineSimilarity(queryTextEmbedding, rule.embedding ?? []),
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, maxResults)

    return rules
  }
}

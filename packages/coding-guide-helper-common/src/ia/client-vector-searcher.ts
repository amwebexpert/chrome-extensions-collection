import { type FeatureExtractionPipeline, type Tensor, env, pipeline } from '@xenova/transformers'
import type { ComputedEmbeddingsStats, GuidelineNode } from '../models/models'
import { cosineSimilarity } from '../utils/llm.utils'
import { loadRuleEmbeddings, storeRuleEmbeddings } from './client-vector-searcher.utils'
import { loadAllRules } from './guideline.collector'
import type { EmbeddingVector, Rule } from './models'

// skip initial check for local models, since we are not loading any local models.
env.allowLocalModels = false

// TODO Ticket-001 Due to a bug in onnxruntime-web, we must disable multithreading for now.
// @see https://github.com/microsoft/onnxruntime/issues/14445 for more information.
env.backends.onnx.wasm.numThreads = 1

enum LlmModel {
  all_minilm_l6_v2 = 'Xenova/all-MiniLM-L6-v2',
  gte_small = 'Xenova/gte-small',
}

type RelevantDocumentsArgs = {
  queryText: string
  maxResults?: number
}

const tensorToEmbeddingVector = (tensor: Tensor): EmbeddingVector =>
  Array.from(tensor.data as number[]).map((v) => Number.parseFloat(v.toFixed(7)))

export const isSemanticServiceAvailable = (): boolean => true

export class FeatureExtractionEmbeddingsSearcher {
  featureExtractionEmbeddings: FeatureExtractionPipeline | null = null
  rules: Rule[] = []

  get hasRules(): boolean {
    return this.rules.length > 0
  }

  get isReadyForSemanticSearch(): boolean {
    return this.hasRules && this.rules.every((rule) => !!rule.embedding)
  }

  get computedEmbeddingsStats(): ComputedEmbeddingsStats {
    return {
      isCompleted: this.isReadyForSemanticSearch,
      total: this.rules.length,
      completed: this.rules.filter((rule) => !!rule.embedding).length,
      nextRuleTitle: this.nextRuleToCompute?.title ?? '',
    }
  }

  get nextRuleToCompute(): Rule | null {
    return this.rules.find((rule) => !rule.embedding) ?? null
  }

  computeNextRuleEmbedding = async (): Promise<void> => {
    if (!this.featureExtractionEmbeddings) throw Error('Model should be loaded first')
    const rule = this.nextRuleToCompute
    if (!rule) return

    const embeddings = await loadRuleEmbeddings(rule)
    if (embeddings) {
      rule.embedding = embeddings
    } else {
      await this.computeRuleEmbedding(rule)
      storeRuleEmbeddings(rule)
    }

    console.info(`🚀 → ${rule.title}`, rule);
  }

  async computeRuleEmbedding(rule: Rule): Promise<void> {
    console.info(`====>>> computing rule embeddings: ${rule.title}`)

    if (!this.featureExtractionEmbeddings) return
    const createEmbedding = this.featureExtractionEmbeddings

    const tensor: Tensor = await createEmbedding(rule.content, { pooling: 'mean', normalize: false })

    rule.embedding = tensorToEmbeddingVector(tensor)
  }

  async computeAllEmbeddings(): Promise<void> {
    if (!this.featureExtractionEmbeddings) throw Error('Model should be loaded first')

    // @see Ticket-001 regarding multiple threads
    // const embeddingPromises = this.rules.map((rule) => this.computeRuleEmbedding(rule))
    // await Promise.all(embeddingPromises)
    while (this.nextRuleToCompute) {
      await this.computeNextRuleEmbedding()
    }

    console.info('====>>> Computed embeddings for all rules. END.')
  }

  async init(rootNode?: GuidelineNode | null) {
    if (!rootNode?.children?.length) throw Error('Guidelines should be loaded first')

    this.rules = loadAllRules(rootNode)
    this.featureExtractionEmbeddings = await pipeline('feature-extraction', LlmModel.all_minilm_l6_v2)
    // TODO Ticket-001: await this.computeEmbeddings()
  }

  findRelevantDocuments = async (configs: RelevantDocumentsArgs): Promise<Rule[]> => {
    if (!this.isReadyForSemanticSearch) return []
    if (!this.featureExtractionEmbeddings) throw Error('Cannot compute embeddings')

    const { queryText, maxResults = 5 } = configs
    const tensor: Tensor = await this.featureExtractionEmbeddings(queryText, {
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

  findRelevantDocument = async (queryText: string): Promise<Rule | null> =>
    this.findRelevantDocuments({ queryText, maxResults: 1 }).then((docs) => docs[0] ?? null)
}

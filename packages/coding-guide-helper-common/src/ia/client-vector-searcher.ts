import { type FeatureExtractionPipeline, type Tensor, env, pipeline } from '@xenova/transformers'
import type { ComputeEmbeddingsStats, GuidelineNode } from '../models/models'
import { cosineSimilarity } from '../utils/llm.utils'
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

  loadRules(rootNode?: GuidelineNode | null) {
    if (!rootNode?.children?.length) throw Error('Guidelines should be loaded first')
    this.rules = loadAllRules(rootNode)
  }

  get hasRules(): boolean {
    return this.rules.length > 0
  }

  get isReadyForSemanticSearch(): boolean {
    return this.hasRules && this.rules.every((rule) => !!rule.embedding)
  }

  get computeEmbeddingsStats(): ComputeEmbeddingsStats {
    return {
      completed: this.rules.filter((rule) => !!rule.embedding).length,
      total: this.rules.length,
      isCompleted: this.isReadyForSemanticSearch,
      nextRuleTitle: this.nextRuleToCompute?.title ?? '',
    }
  }

  async loadModel(model = LlmModel.all_minilm_l6_v2) {
    console.info(`====>>> model "${model}" feature-extraction pipeline creation...`)
    this.featureExtractionEmbeddings = await pipeline('feature-extraction', model)
    console.info(`====>>> model "${model}" feature-extraction pipeline created.`)
  }

  get nextRuleToCompute(): Rule | null {
    return this.rules.find((rule) => !rule.embedding) ?? null
  }

  computeNextRuleEmbedding = async (): Promise<void> => {
    if (!this.featureExtractionEmbeddings) throw Error('Model should be loaded first')
    const rule = this.nextRuleToCompute
    if (!rule) return

    await this.computeRuleEmbedding(rule)
  }

  async computeRuleEmbedding(rule: Rule): Promise<void> {
    console.info(`====>>> computing rule embeddings: ${rule.title}`)

    if (!this.featureExtractionEmbeddings) return
    const createEmbedding = this.featureExtractionEmbeddings

    const tensor: Tensor = await createEmbedding(rule.content, { pooling: 'mean', normalize: false })

    rule.embedding = tensorToEmbeddingVector(tensor)
  }

  async computeEmbeddings(): Promise<void> {
    if (!this.featureExtractionEmbeddings) throw Error('Model should be loaded first')

    const embeddingPromises = this.rules.map((rule) => this.computeRuleEmbedding(rule))
    await Promise.all(embeddingPromises)
    console.info('====>>> Computed embeddings for all rules. END.')
  }

  async init(rootNode?: GuidelineNode | null) {
    this.loadRules(rootNode)
    await this.loadModel(LlmModel.gte_small)
    // TODO Ticket-001: await this.computeEmbeddings()
  }

  findRelevantDocuments = async (configs: RelevantDocumentsArgs): Promise<Rule[]> => {
    if (!this.isReadyForSemanticSearch) return []
    if (!this.featureExtractionEmbeddings) throw Error('Cannot compute embeddings')

    const { queryText, maxResults = 3 } = configs
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

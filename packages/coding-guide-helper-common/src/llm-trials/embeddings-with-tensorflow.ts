import { collectOnlineGuidelines } from '../background/service-worker.utils'
import type { EmbeddingVector, Rule } from '../ia/models'

// @see https://www.npmjs.com/package/tensorflow-models
// NOTE: this model tends to have bad performances because it is way too generic
import * as use from '@tensorflow-models/universal-sentence-encoder'
import '@tensorflow/tfjs'
import { loadAllRules } from '../ia/guideline.collector'
import { cosineSimilarity } from '../utils/llm.utils'
import { SAMPLE_QUERIES } from './queries.utils'

const generateEmbedding = async (documents: string[]): Promise<EmbeddingVector[]> => {
  console.info('====>>> loading model') // 5 seconds
  const model = await use.load()

  console.info('====>>> creating embeddings') // 30 seconds
  const tensor2D = await model.embed(documents)

  const embeddings = await tensor2D.array()

  tensor2D.dispose()

  return embeddings
}

const main = async () => {
  const rootNode = await collectOnlineGuidelines()
  const rules = loadAllRules(rootNode)

  // compute embeddings for each rule
  const documents: string[] = rules.map((rule) => rule.content)
  const embeddings: EmbeddingVector[] = await generateEmbedding(documents)
  rules.forEach((rule, idx) => {
    rule.embedding = embeddings[idx]
  })

  for (const queryTexts of SAMPLE_QUERIES) {
    const bestDocTitle = await findRelevantDocument(queryTexts, rules)
    console.info(`====>>> bestDocTitle for "${queryTexts}"`, bestDocTitle)
  }
}

const findRelevantDocument = async (queryText: string, documentsEmbeddings: Rule[]) => {
  const [queryTextEmbedding] = await generateEmbedding([queryText])
  let bestDoc: Rule | null = null
  let bestSimilarity = -1

  for (const docEmbedding of documentsEmbeddings) {
    const similarity: number = cosineSimilarity(queryTextEmbedding, docEmbedding.embedding ?? [])
    if (similarity > bestSimilarity) {
      bestSimilarity = similarity
      bestDoc = docEmbedding
    }
  }

  return bestDoc ? bestDoc.title : null
}

main()

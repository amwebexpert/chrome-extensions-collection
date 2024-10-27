import { collectOnlineGuidelines } from '../src/background/service-worker.utils'
import type { EmbeddingVector, Rule } from '../src/ia/models/models'
import { loadAllRules } from './../src/ia/utils/guideline.collector'
import { QUERIES } from './queries.utils'

// @see https://www.npmjs.com/package/tensorflow-models
import * as use from '@tensorflow-models/universal-sentence-encoder'
import '@tensorflow/tfjs'

const generateEmbedding = async (documents: string[]): Promise<EmbeddingVector[]> => {
  console.info('====>>> loading model') // 5 seconds
  const model = await use.load()

  console.info('====>>> creating embeddings') // 30 seconds
  const tensor2D = await model.embed(documents)

  const embeddings = await tensor2D.array()

  tensor2D.dispose()

  return embeddings
}

const cosineSimilarity = (vectorA: EmbeddingVector, vectorB: EmbeddingVector): number => {
  const dotProduct: number = vectorA.reduce((sum, a, idx) => sum + a * vectorB[idx], 0)

  const magnitudeA: number = Math.sqrt(vectorA.reduce((sum, a) => sum + a * a, 0))
  const magnitudeB: number = Math.sqrt(vectorB.reduce((sum, b) => sum + b * b, 0))

  return dotProduct / (magnitudeA * magnitudeB)
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

  for (const queryTexts of QUERIES) {
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

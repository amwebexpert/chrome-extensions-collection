import { collectOnlineGuidelines } from '../src/background/service-worker.utils'
import type { GuidelineNode } from '../src/models/models'

import * as use from '@tensorflow-models/universal-sentence-encoder'
import '@tensorflow/tfjs'

type EmbeddingVector = number[]

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
  const rules: Rule[] = await loadRules()

  // compute embeddings for each rule
  const documents: string[] = rules.map((rule) => rule.content)
  const embeddings: EmbeddingVector[] = await generateEmbedding(documents)
  rules.forEach((rule, idx) => {
    rule.embedding = embeddings[idx]
  })

  const queryText = 'ternary abuse'
  // const queryText = 'many args position'
  //const queryText = 'multiple values comparison'

  const bestDocTitle = await findRelevantDocument(queryText, rules)
  console.info('====>>> bestDocTitle', bestDocTitle)
}

type Rule = {
  title: string
  content: string
  embedding?: EmbeddingVector
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

const extractFullRule = (node: GuidelineNode): Rule => {
  const title = node.titleMarkdown

  const content = node.children
    .map((child) => `${child.titleMarkdown}\n${child.markdownLines.join('\n')}`)
    .join('\n')

  return { title, content }
}

const loadRules = async (): Promise<Rule[]> => {
  const rootNode = await collectOnlineGuidelines()
  const tsCodingGuidelines: GuidelineNode = rootNode.children[0] // 1st one is TS coding guidelines

  const rules: Rule[] = []
  for (const child of tsCodingGuidelines.children) {
    rules.push(extractFullRule(child))
  }

  return rules
}

main()

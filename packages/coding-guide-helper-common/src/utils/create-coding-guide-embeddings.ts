import * as fs from 'node:fs'
import * as path from 'node:path'
import { simpleHash } from '@packages/chrome-common'
import { collectOnlineGuidelines } from '../background/service-worker.utils'
import { FeatureExtractionEmbeddingsSearcher } from '../ia/client-vector-searcher'
import type { EmbeddingVector } from '../ia/models'

export type EmbeddingInfo = {
  contentSha256: number
  embedding: EmbeddingVector
}

const generateEmbeddingsMap = async (): Promise<Record<string, EmbeddingInfo>> => {
  const rootNode = await collectOnlineGuidelines()

  const searcher = new FeatureExtractionEmbeddingsSearcher()
  await searcher.init(rootNode)

  const result = searcher.rules.reduce(
    (acc, rule) => {
      if (!rule.embedding || !rule.href) {
        console.warn('====>>> Missing embedding or href for rule', rule)
        return acc
      }

      acc[rule.href] = {
        contentSha256: simpleHash(rule.content),
        embedding: rule.embedding,
      }
      return acc
    },
    {} as Record<string, EmbeddingInfo>,
  )

  console.info('====>>> embeddings count', Object.keys(result).length)
  return result
}

const computeTargetPath = (): string => {
  const outputPath = path.resolve(__dirname, '../../../coding-guide-helper/public/embeddings.json')
  const dir = path.dirname(outputPath)

  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

  return outputPath
}

export const generateEmbeddingsJsonFile = async (): Promise<void> => {
  console.info('Generating embeddings map...')
  const embeddings = await generateEmbeddingsMap()

  const outputPath = computeTargetPath()

  fs.writeFileSync(outputPath, JSON.stringify(embeddings, null, 2))
  console.info(`Embeddings saved to "${outputPath}"`)
}

generateEmbeddingsJsonFile()

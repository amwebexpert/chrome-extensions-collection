import type { EmbeddingVector } from '../ia/models'

export const cosineSimilarity = (vecA: EmbeddingVector, vecB: EmbeddingVector): number => {
  if (vecA.length !== vecB.length) {
    throw new Error(`Vectors must have the same length ${vecA.length} !== ${vecB.length}`)
  }

  let dotProduct = 0
  let magnitudeA = 0
  let magnitudeB = 0

  for (let i = 0; i < vecA.length; i++) {
    const aValue = vecA[i] ?? 0
    const bValue = vecB[i] ?? 0

    dotProduct += aValue * bValue
    magnitudeA += aValue * aValue
    magnitudeB += bValue * bValue
  }

  if (magnitudeA === 0 || magnitudeB === 0) return 0

  // calculate cosine similarity and round to specified precision
  const cosineSim = dotProduct / (magnitudeA * magnitudeB)
  return Number.parseFloat(cosineSim.toFixed(7))
}

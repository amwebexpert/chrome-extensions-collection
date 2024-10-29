import type { EmbeddingVector } from '../ia/models'

export const cosineSimilarity = (vecA: EmbeddingVector, vecB: EmbeddingVector): number => {
  // Check if both vectors have the same length
  if (vecA.length !== vecB.length) {
    throw new Error(`Vectors must have the same length ${vecA.length} !== ${vecB.length}`)
  }

  // Compute dot product and magnitudes
  const dotProduct = vecA.reduce((sum, a, i) => {
    const b = vecB[i] // Extract value safely
    return sum + a * (b !== undefined ? b : 0) // Check for undefined
  }, 0)
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0))
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0))

  // Check if either magnitude is zero
  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0
  }

  // Calculate cosine similarity and round to specified precision
  return Number.parseFloat((dotProduct / (magnitudeA * magnitudeB)).toFixed(6))
}

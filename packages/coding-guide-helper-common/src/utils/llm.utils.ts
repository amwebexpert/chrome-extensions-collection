import similarity from 'compute-cosine-similarity'
import type { EmbeddingVector } from '../ia/models'

export const cosineSimilarity = (vecA: EmbeddingVector, vecB: EmbeddingVector): number => {
  if (!vecA || !vecA.length || !vecB || !vecB.length) {
    return 0
  }

  if (vecA.length !== vecB.length) {
    throw new Error(`Vectors must have the same length ${vecA.length} !== ${vecB.length}`)
  }

  const cosineSim = similarity(vecA, vecB)
  return cosineSim ? Number.parseFloat(cosineSim.toFixed(7)) : 0
}

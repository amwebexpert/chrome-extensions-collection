import type { EmbeddingVector } from '../ia/models'
import { cosineSimilarity } from './llm.utils'

describe('LLM utilities tests suite', () => {
  describe('cosineSimilarity', () => {
    it('calculates the cosine similarity of two identical vectors', () => {
      const vecA: EmbeddingVector = [1, 2, 3]
      const vecB: EmbeddingVector = [1, 2, 3]
      expect(cosineSimilarity(vecA, vecB)).toBeCloseTo(1, 7)
    })

    it('returns 0 for orthogonal vectors', () => {
      const vecA: EmbeddingVector = [1, 0, 0]
      const vecB: EmbeddingVector = [0, 1, 0]
      expect(cosineSimilarity(vecA, vecB)).toBeCloseTo(0, 7)
    })

    it('handles vectors with different magnitudes', () => {
      const vecA: EmbeddingVector = [1, 2, 3]
      const vecB: EmbeddingVector = [2, 4, 6]
      expect(cosineSimilarity(vecA, vecB)).toBeCloseTo(1, 7)
    })

    it('returns 0 for vectors with zero magnitude', () => {
      const vecA: EmbeddingVector = [0, 0, 0]
      const vecB: EmbeddingVector = [1, 2, 3]
      expect(cosineSimilarity(vecA, vecB)).toBe(0)

      const vecC: EmbeddingVector = [0, 0, 0]
      const vecD: EmbeddingVector = [0, 0, 0]
      expect(cosineSimilarity(vecC, vecD)).toBe(0)
    })

    it('throws an error if vectors have different lengths', () => {
      const vecA: EmbeddingVector = [1, 2, 3]
      const vecB: EmbeddingVector = [1, 2]
      expect(() => cosineSimilarity(vecA, vecB)).toThrow('Vectors must have the same length 3 !== 2')
    })

    it('handles vectors with negative values', () => {
      const vecA: EmbeddingVector = [-1, -2, -3]
      const vecB: EmbeddingVector = [1, 2, 3]
      expect(cosineSimilarity(vecA, vecB)).toBeCloseTo(-1, 7)
    })

    it('handles vectors with mixed values', () => {
      const vecA: EmbeddingVector = [1, -2, 3]
      const vecB: EmbeddingVector = [-1, 2, -3]
      expect(cosineSimilarity(vecA, vecB)).toBeCloseTo(-1, 7)
    })
  })
})

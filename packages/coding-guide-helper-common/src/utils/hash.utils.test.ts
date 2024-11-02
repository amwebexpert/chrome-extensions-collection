import { simpleHash } from './hash.utils'

describe('simpleHash', () => {
  it('should return 0 for an empty string', () => {
    expect(simpleHash('')).toBe(0)
  })

  it('should return the same hash for the same string', () => {
    const str = 'test'
    expect(simpleHash(str)).toBe(simpleHash(str))
  })

  it('should return different hashes for different strings', () => {
    const str1 = 'test1'
    const str2 = 'test2'
    expect(simpleHash(str1)).not.toBe(simpleHash(str2))
  })

  it('should return a 32-bit integer', () => {
    const str = 'test'
    const hash = simpleHash(str)
    expect(hash).toBeGreaterThanOrEqual(-2147483648)
    expect(hash).toBeLessThanOrEqual(2147483647)
  })

  it('should handle long strings', () => {
    const str = 'a'.repeat(1000)
    expect(simpleHash(str)).toBeDefined()
  })
})

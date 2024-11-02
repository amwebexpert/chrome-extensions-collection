export const simpleHash = (str: string): number => {
  let hash = 0
  if (str.length === 0) return hash

  for (let i = 0; i < str.length; i++) {
    const char: number = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash |= 0 // Convert to 32-bit integer
  }

  return hash
}

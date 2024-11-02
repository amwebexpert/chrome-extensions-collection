export type EmbeddingVector = number[]

export type Rule = {
  title: string
  content: string
  href: string
  embedding?: EmbeddingVector
  similarity?: number
}

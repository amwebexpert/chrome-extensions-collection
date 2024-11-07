export type EmbeddingVector = number[]

export type Rule = {
  title: string
  content: string
  href: string
  embedding?: EmbeddingVector
  similarity?: number
}

export type SerializedRule = {
  href: string
  contentSha256: number
  embedding: EmbeddingVector
}

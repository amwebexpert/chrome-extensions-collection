export type EmbeddingVector = number[]

export type Rule = {
  title: string
  content: string
  embedding?: EmbeddingVector
}

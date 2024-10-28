export const extractLanguageFromClassName = (className?: string) => {
  if (!className) return undefined

  const match = /language-(\w+)/.exec(className)
  return match ? match[1] : undefined
}

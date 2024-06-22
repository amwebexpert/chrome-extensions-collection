export const splitTocAndContent = (markdownText: string) => {
  // regex to split at very first level one title line, starting with "# "
  const regex = /^# .*\n/gm

  const match = regex.exec(markdownText)

  if (!match) {
    throw new Error('No title found in markdown')
  }

  const toc = markdownText.slice(0, match.index)
  const content = markdownText.slice(match.index)

  return {
    toc,
    content,
  }
}

export const splitTocAndContent = (markdown: string) => {
  // regex to split at very first level one title line, starting with "# "
  const regex = /^# .*\n/gm

  const match = regex.exec(markdown)

  if (!match) {
    throw new Error('No title found in markdown')
  }

  const toc = markdown.slice(0, match.index)
  const content = markdown.slice(match.index)

  return {
    toc,
    content,
  }
}

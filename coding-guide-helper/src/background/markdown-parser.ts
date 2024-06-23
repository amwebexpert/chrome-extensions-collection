export type GuidelineNode = {
  level: number
  title: string
  titleMarkdown: string
  href: string
  searchItems: string[]
  subLinks: GuidelineNode[]
  parent?: GuidelineNode
}

type BuildOrderedNodesArgs = {
  node: GuidelineNode
  allOrderedNodes?: GuidelineNode[]
}
export const buildOrderedNodes = ({ node, allOrderedNodes = [] }: BuildOrderedNodesArgs): void => {
  allOrderedNodes.push(node)

  for (const subLink of node.subLinks) {
    buildOrderedNodes({ node: subLink, allOrderedNodes })
  }
}

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

export const buildGuidelineLinksFromTocText = (tocText: string): GuidelineNode => {
  const lines = tocText.split('\n').filter((line) => line.trim().length > 0)

  const rootNode: GuidelineNode = buildNode({ level: 0, title: 'TOC', href: '' })

  buildGuidelineLinksFromLines({ node: rootNode, lines, currentLineIndex: 0 })
  return rootNode
}

export const parseTocLine = (line: string) => {
  // extract title, level and href from line
  // Example 1: '- [Project coding standards](#project-coding-standards)' is level 1
  // Example 2: '  - [avoid `{renderAbc()}` pattern](#avoid-renderabc-pattern)' is level 2
  const match = line.match(/^( *)(- )?\[([^\]]+)\]\(([^)]+)\)$/)
  if (!match) throw new Error(`Invalid TOC line: ${line}`)

  const level = 1 + match[1].length / 2
  const title = match[3]
  const href = match[4]

  return { level, title, href }
}

type BuildNodeArgs = { parent?: GuidelineNode; level: number; title: string; href: string }
const buildNode = ({ parent, level, title, href }: BuildNodeArgs) => ({
  parent,
  level,
  title,
  titleMarkdown: `${'#'.repeat(level)} ${title}`,
  href,
  searchItems: [],
  subLinks: [],
})

type FindParentNodeArgs = {
  node: GuidelineNode
  level: number
}
export const findParentNodeForLevel = ({ node, level }: FindParentNodeArgs): GuidelineNode => {
  let currentNode = node
  while (currentNode.level >= level) {
    if (!currentNode.parent) throw new Error(`no parent for level ${level} - ${currentNode.title}`)
    currentNode = currentNode.parent
  }

  return currentNode
}

type BuildGuidelineLinksFromLinesArgs = {
  node: GuidelineNode
  lines: string[]
  currentLineIndex?: number
}
export const buildGuidelineLinksFromLines = ({
  node,
  lines,
  currentLineIndex = 0,
}: BuildGuidelineLinksFromLinesArgs): void => {
  const line = lines[currentLineIndex]

  if (!line) return

  const { level, title, href } = parseTocLine(line)

  if (level > node.level) {
    const newNode = buildNode({ parent: node, level, title, href })
    node.subLinks.push(newNode)

    buildGuidelineLinksFromLines({
      node: newNode,
      lines,
      currentLineIndex: currentLineIndex + 1,
    })

    return
  }

  const parentNode = findParentNodeForLevel({ node, level })
  buildGuidelineLinksFromLines({ node: parentNode, lines, currentLineIndex })
}

export const jsonSerializeReplacer = (key: string, value: unknown) => {
  if (['parent', 'level', 'href', 'searchItems'].includes(key)) return undefined

  return value
}

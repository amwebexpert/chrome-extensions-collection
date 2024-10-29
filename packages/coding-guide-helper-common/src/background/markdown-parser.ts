import type { GuidelineNode } from '../models/models'

type GuidelineFromTextArgs = {
  rootNode: GuidelineNode
  text: string
  baseUrl: string
}
export const createGuidelineNodes = ({
  rootNode,
  text,
  baseUrl,
}: GuidelineFromTextArgs): GuidelineNode => {
  const { toc, content } = splitTocAndContent({ text, baseUrl })
  buildGuidelineNodesFromToC({ rootNode, text: toc, baseUrl })

  const allOrderedNodes = buildOrderedNodes({ node: rootNode })
  populateGuidelineNodesSearchableContent({ allOrderedNodes, content })

  return rootNode
}

type PopulateMarkdownLinesFromContentArgs = {
  allOrderedNodes: GuidelineNode[]
  content: string
}
export const populateGuidelineNodesSearchableContent = ({
  allOrderedNodes,
  content,
}: PopulateMarkdownLinesFromContentArgs): void => {
  const allContentLines = content.split('\n')
  let contentLineIndex = 0
  const orderedNodes = allOrderedNodes.slice(1) // skip root 'TOC' node level 0

  // traverse all lines and populate markdownLines of each node when line is not a title
  for (const node of orderedNodes) {
    let line = allContentLines[contentLineIndex]

    // move to next line if current line is the title of the node
    if (line === node.titleMarkdown) {
      contentLineIndex++
      line = allContentLines[contentLineIndex]
    }

    // populate markdownLines until next title line
    while (line !== undefined && !line.startsWith('#')) {
      node.markdownLines.push(line)
      contentLineIndex++
      line = allContentLines[contentLineIndex]
    }
  }
}

type BuildOrderedNodesArgs = {
  node: GuidelineNode
  allOrderedNodes?: GuidelineNode[]
}
export const buildOrderedNodes = ({
  node,
  allOrderedNodes = [],
}: BuildOrderedNodesArgs): GuidelineNode[] => {
  allOrderedNodes.push(node)

  for (const subLink of node.children) {
    buildOrderedNodes({ node: subLink, allOrderedNodes })
  }

  return allOrderedNodes
}

type SplitTocAndContentResult = {
  toc: string
  content: string
}
type SplitTocAndContentArgs = {
  text: string
  baseUrl: string
}
export const splitTocAndContent = ({
  text,
  baseUrl,
}: SplitTocAndContentArgs): SplitTocAndContentResult => {
  const regex = /^# .*\n/gm // split at very first level one title line, starting with "# "
  const match = regex.exec(text)
  if (!match) {
    const message = `No title found in markdown for ${baseUrl}`
    console.error(message, text)
    throw new Error(message)
  }

  const toc = text.slice(0, match.index)
  const content = text.slice(match.index)

  return {
    toc,
    content,
  }
}

export const buildGuidelineNodesFromToC = ({
  rootNode,
  text,
  baseUrl,
}: GuidelineFromTextArgs): GuidelineNode => {
  const lines = text
    .split('\n')
    .filter((line) => line.trim().length > 0)
    .filter((line) => !line.toLowerCase().startsWith('table of content'))

  buildGuidelineLinksFromLines({ node: rootNode, lines, currentLineIndex: 0, baseUrl })
  return rootNode
}

type ParseTocLineResult = {
  level: number
  title: string
  href: string
}
/**
 * Txtract title, level and href from line
 *
 * Example 1: '- [Project coding standards](#project-coding-standards)'
 *     level: 1
 *     title: 'Project coding standards'
 *     href: 'project-coding-standards'
 * Example 2: '  - [avoid `{renderAbc()}` pattern](#avoid-renderabc-pattern)'
 *     level: 2
 *     title: 'avoid `{renderAbc()}` pattern'
 *     href: 'avoid-renderabc-pattern'
 * Example 3: '    - [✅ prefer usage of `[].includes(...)`](#-prefer-usage-of-includes)'
 *     level: 3
 *     title: '✅ prefer usage of `[].includes(...)`'
 *     href: '-prefer-usage-of-includes'
 */
export const parseTocLine = (line: string): ParseTocLineResult => {
  const regex = /^( *)-\s*\[(.*?)\]\(#(.*?)\)$/
  const match = line.match(regex)
  if (!match) throw new Error(`Invalid TOC line: ${line}`)

  const level = match[1].length / 2 + 1
  const title = match[2]
  const href = match[3]

  return { level, title, href }
}

const normalizeTitle = (title: string): string => title.replaceAll('\\', '')

type BuildTitleMarkdownArgs = { level: number; title: string }
const buildTitleMarkdown = ({ level, title }: BuildTitleMarkdownArgs): string =>
  `${'#'.repeat(level)} ${normalizeTitle(title)}`

type BuildNodeArgs = {
  parent?: GuidelineNode
  level: number
  title: string
  baseUrl: string
  href: string
}
export const buildNode = ({
  parent,
  level,
  title,
  href,
  baseUrl,
}: BuildNodeArgs): GuidelineNode => ({
  parent,
  level,
  title,
  titleMarkdown: buildTitleMarkdown({ level, title }),
  href: `${baseUrl
    .replace(/raw\.githubusercontent/, 'github')
    .replace('/master/', '/blob/master/')
    .replace('/raw/', '/blob/')}#${href}`,
  markdownLines: [],
  children: [],
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
  baseUrl: string
  node: GuidelineNode
  lines: string[]
  currentLineIndex?: number
}
export const buildGuidelineLinksFromLines = ({
  baseUrl,
  node,
  lines,
  currentLineIndex = 0,
}: BuildGuidelineLinksFromLinesArgs): void => {
  const line = lines[currentLineIndex]

  if (!line) return

  const { level, title, href } = parseTocLine(line)

  if (level > node.level) {
    const newNode = buildNode({ parent: node, level, title, href, baseUrl })
    node.children.push(newNode)

    buildGuidelineLinksFromLines({
      baseUrl,
      node: newNode,
      lines,
      currentLineIndex: currentLineIndex + 1,
    })

    return
  }

  const parentNode = findParentNodeForLevel({ node, level })
  buildGuidelineLinksFromLines({ node: parentNode, lines, currentLineIndex, baseUrl })
}

export const jsonSerializeReplacer = (key: string, value: unknown) => {
  if (['parent', 'level', 'href', 'markdownLines'].includes(key)) return undefined

  return value
}

export const serializeWitoutParent = (node: GuidelineNode): string => {
  return JSON.stringify(
    node,
    (key: string, value: unknown) => (key === 'parent' ? undefined : value),
    2,
  )
}

export const cloneAndRemoveAllParents = (node: GuidelineNode): GuidelineNode => {
  const newNode = {
    ...node,
    parent: undefined,
    shouldDisplayNode: undefined,
    isMatching: undefined,
  }

  newNode.children = newNode.children?.map(cloneAndRemoveAllParents) ?? []

  return newNode
}

export const isParentOfAvoidPreferSection = (node: GuidelineNode): boolean =>
  node.children.some(isGuidelineAvoidOrPreferSection)

export const isGuidelineAvoidOrPreferSection = (node: GuidelineNode): boolean =>
  ['❌ avoid', '✅ prefer'].some((section) => node.title.toLowerCase().includes(section))

export const hasDescendentMatching = (node: GuidelineNode): boolean =>
  node.isMatching ||
  node.children.some((child) => child.isMatching) ||
  node.children.some(hasDescendentMatching)

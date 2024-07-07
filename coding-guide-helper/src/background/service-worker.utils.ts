import { type GuidelineNode, MenuItems } from '../models/models'
import {
  buildNode,
  buildOrderedNodes,
  cloneAndRemoveAllParents,
  createGuidelineNodes,
  hasDescendentMatching,
  isParentOfAvoidPreferSection,
} from './markdown-parser'

export const normalizeForSearch = (search: string): string =>
  search.toLowerCase().replaceAll('`', '').trim()

type FilterGuidelines = {
  search: string
  rootNode: GuidelineNode
}
export const filterGuidelines = ({ search, rootNode }: FilterGuidelines): GuidelineNode[] => {
  if (!rootNode) return []

  const normalizedSearch = normalizeForSearch(search)
  if (!normalizedSearch) return []

  // traverse the tree and mark nodes that match the search inside its markdownLines
  const clonedRoot = cloneAndRemoveAllParents(rootNode)
  const allOrderedNodes = buildOrderedNodes({ node: clonedRoot })
  for (const node of allOrderedNodes) {
    node.isMatching =
      normalizeForSearch(node.title).includes(normalizedSearch) ||
      node.markdownLines.some((line) => normalizeForSearch(line).includes(normalizedSearch))
  }

  // traverse the tree and determine which nodes to show
  for (const node of allOrderedNodes) {
    if (!isParentOfAvoidPreferSection(node)) continue

    node.shouldDisplayNode = node.isMatching || hasDescendentMatching(node)
  }

  return allOrderedNodes
}

export const getFullOrderedNodes = (rootNode: GuidelineNode): GuidelineNode[] => {
  if (!rootNode) return []

  const clonedRoot = cloneAndRemoveAllParents(rootNode)
  return buildOrderedNodes({ node: clonedRoot })
}

export const menuItemSendSelection: chrome.contextMenus.CreateProperties = {
  id: MenuItems.SEND_SELECTION,
  title: 'Search in Coding Guidelines',
  contexts: ['selection'],
}

export const collectOnlineGuidelines = async (): Promise<GuidelineNode> => {
  const urls = await getGuidelineUrlResources()

  return collectAllGuidelinesIntoSingleRoot(urls)
}

export const storeOrderedNodes = (node: GuidelineNode): void => {
  const allOrderedNodes = getFullOrderedNodes(node)

  console.debug(
    '====>>> debug guidelines ordered nodes:',
    allOrderedNodes.map((node) => `${node.titleMarkdown}\n${node.markdownLines.join('\n    ')}`),
  )
  chrome.storage.local.set({ allOrderedNodes })
}

export const collectOfflineGuidelines = async (): Promise<GuidelineNode> => {
  const urls = [
    chrome.runtime.getURL('markdowns/example-1.md'),
    chrome.runtime.getURL('markdowns/example-2.md'),
  ]

  return collectAllGuidelinesIntoSingleRoot(urls)
}

const collectAllGuidelinesIntoSingleRoot = async (urls: string[]): Promise<GuidelineNode> => {
  const rootNode: GuidelineNode = buildNode({
    level: 0,
    title: 'Root TOC node grouping all guidelines',
    href: '',
    baseUrl: '',
  })

  for (const url of urls) {
    const markdownText = await fetchCodingGuidelinesText(url)
    createGuidelineNodes({ rootNode, text: markdownText, baseUrl: url })
  }

  return rootNode
}

const getGuidelineUrlResources = async (): Promise<string[]> => {
  return new Promise((resolve) => {
    chrome.storage.local.get('options', ({ options }) => {
      const markdownFilesUrlPrefix: string = options?.markdownFilesUrlPrefix ?? ''
      const filesString: string = options?.files ?? ''
      const filenames = filesString
        .split('\n')
        .map((filename) => filename.trim())
        .filter(Boolean)

      const fullFilenames = filenames.map(
        // Pattern 1: https://raw.githubusercontent.com/amwebexpert/chrome-extensions-collection/master/coding-guide-helper/public/markdowns/common-coding-patterns.md
        // Pattern 2: https://github.com/${organizationName}/${repoName}/raw/main/${filename}
        (filename) => `${markdownFilesUrlPrefix}/${filename}`,
      )

      resolve(fullFilenames)
    })
  })
}

export const fetchCodingGuidelinesText = async (url: string): Promise<string> => {
  // TODO Response caching
  const response = await fetch(url, { method: 'GET', redirect: 'follow' })
  return await response.text()
}

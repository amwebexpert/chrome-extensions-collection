import { type GuidelineNode, MenuItems } from '../models/models'
import { getOptions } from '../utils/options.utils'
import {
  buildNode,
  buildOrderedNodes,
  cloneAndRemoveAllParents,
  createGuidelineNodes,
  hasDescendentMatching,
  isParentOfAvoidPreferSection,
} from './markdown-parser'

type CombineSearchResultsArgs = {
  exactMatches: GuidelineNode[]
  semanticMatches: GuidelineNode[]
}

export const combineSearchResults = ({ exactMatches, semanticMatches }: CombineSearchResultsArgs): GuidelineNode[] => {
  const exactMatchHrefs = exactMatches.filter((node) => node.shouldDisplayNode).map((node) => node.href)
  const semanticMatchHrefs = semanticMatches.map((node) => node.href)
  console.info('====>>> combineearchResults', { exactMatchHrefs, semanticMatchHrefs })

  const combinedResults = [...exactMatches]

  for (const semanticResult of semanticMatches) {
    if (!exactMatchHrefs.includes(semanticResult.href)) combinedResults.push(semanticResult)
  }

  console.info(`====>>> returning ${combinedResults.length} combined search results`)

  return combinedResults
}

export const getSenderInfo = (sender: chrome.runtime.MessageSender): string =>
  sender.tab?.id ? `tab ${sender.tab.id}` : 'extension'

export const normalizeForSearch = (search: string): string => search.toLowerCase().replaceAll('`', '').trim()

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

  return allOrderedNodes.filter((node) => node.shouldDisplayNode)
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
  const urls = [chrome.runtime.getURL('markdowns/example-1.md'), chrome.runtime.getURL('markdowns/example-2.md')]

  return collectAllGuidelinesIntoSingleRoot(urls)
}

const collectAllGuidelinesIntoSingleRoot = async (urls: string[]): Promise<GuidelineNode> => {
  const rootNode: GuidelineNode = buildNode({
    level: 0,
    title: 'Root TOC node grouping all guidelines',
    href: '',
    baseUrl: '',
  })

  const results = await Promise.all(urls.map(fetchCodingGuidelinesText))

  results.map((text, index) => createGuidelineNodes({ rootNode, text, baseUrl: urls[index] }))

  return rootNode
}

const getGuidelineUrlResources = async (): Promise<string[]> => {
  const { markdownFilesUrlPrefix, files } = await getOptions()

  const prefix = markdownFilesUrlPrefix?.trim() ?? ''
  const filenames = (files ?? '')
    .split('\n')
    .map((filename) => filename.trim())
    .filter(Boolean)

  const fullFilenames = filenames
    .map((filename) => filename.replace(/\/\//g, '/')) // remove double slashes
    .map(
      // Pattern 1: https://raw.githubusercontent.com/amwebexpert/chrome-extensions-collection/master/packages/coding-guide-helper/public/markdowns/common-coding-patterns.md
      // Pattern 2: https://github.com/${organizationName}/${repoName}/raw/main/${filename}
      (filename) => `${prefix}/${filename}`,
    )

  return fullFilenames
}

export const fetchCodingGuidelinesText = async (url: string): Promise<string> => {
  // Possible improvement: use cache mechanism (Axios with cache interceptor or react-query default cache)
  const response = await fetch(url, { method: 'GET', redirect: 'follow' })
  return response.text()
}

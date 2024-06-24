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
  search.toLowerCase().replaceAll('`', '')

type FilterGuidelines = {
  search: string
  rootNode: GuidelineNode
}
export const filterGuidelines = ({ search, rootNode }: FilterGuidelines): GuidelineNode[] => {
  const normalizedSearch = normalizeForSearch(search)
  //console.info(`====>>> "${searchLowercase}"`)

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

export const menuItemSendSelection: chrome.contextMenus.CreateProperties = {
  id: MenuItems.SEND_SELECTION,
  title: 'Search in Coding Guidelines',
  contexts: ['selection'],
}

export const collectOnlineGuidelines = async (): Promise<GuidelineNode> => {
  const urls = await getGuidelineUrlResources()

  return collectAllGuidelinesIntoSingleRoot(urls)
}

export const debugOrderedNodes = (node: GuidelineNode): void => {
  const allOrderedNodes = buildOrderedNodes({ node })

  console.debug(
    '====>>> debug guidelines ordered nodes:',
    allOrderedNodes.map((node) => `${node.titleMarkdown}\n${node.markdownLines.join('\n    ')}`),
  )
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
    title: 'TOC',
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
      const organizationName: string = options?.organizationName ?? ''
      const repoName: string = options?.repoName ?? ''
      const filesString: string = options?.files ?? ''
      const filenames = filesString
        .split('\n')
        .map((filename) => filename.trim())
        .filter(Boolean)

      const fullFilenames = filenames.map(
        (filename) => `https://github.com/${organizationName}/${repoName}/raw/main/${filename}`,
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

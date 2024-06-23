import { type GuidelineNode, MenuItems } from '../models/models'
import { buildNode, createGuidelineNodes } from './markdown-parser'

type FilterGuidelines = {
  search: string
  rootNode: GuidelineNode
}
export const filterGuidelines = ({ search, rootNode }: FilterGuidelines): GuidelineNode => {
  const searchLowercase = search.toLowerCase()
  console.info('====>>> searchLowercase', searchLowercase)
  return rootNode
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

export const collectOfflineGuidelines = async (): Promise<GuidelineNode> => {
  const urls = [
    chrome.runtime.getURL('markdowns/example-1.md'),
    chrome.runtime.getURL('markdowns/example-2.md'),
  ]

  return collectAllGuidelinesIntoSingleRoot(urls)
}

const collectAllGuidelinesIntoSingleRoot = async (urls: string[]): Promise<GuidelineNode> => {
  const rootNode: GuidelineNode = buildNode({ level: 0, title: 'TOC', href: '' })

  for (const resourceUrl of urls) {
    const markdownText = await fetchCodingGuidelinesText(resourceUrl)
    createGuidelineNodes({ rootNode, text: markdownText })
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

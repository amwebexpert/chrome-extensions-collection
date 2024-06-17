import { type Tokens, type TokensList, marked } from 'marked'
import type { GuidelineLink } from '../app.types'
import { MenuItems } from '../models/models'

const RULES_TITLE_LOCATION_DEPTH: number = 2
const isRulesAtLevelOne = RULES_TITLE_LOCATION_DEPTH === 1

type FilterGuidelines = {
  search: string
  guideLines: Map<string, GuidelineLink>
}
export const filterGuidelines = ({ search, guideLines }: FilterGuidelines): GuidelineLink[] => {
  const searchLowercase = search.toLowerCase()
  const allGuidelines = Array.from(guideLines.values())

  return allGuidelines.filter((guideline) => {
    const searchItems = guideline.searchItems
    return searchItems.some((item) => item.toLowerCase().includes(searchLowercase))
  })
}

export const menuItemSendSelection: chrome.contextMenus.CreateProperties = {
  id: MenuItems.SEND_SELECTION,
  title: 'Search in Coding Guidelines',
  contexts: ['selection'],
}

export const buildGuidelineMap = async (): Promise<Map<string, GuidelineLink>> => {
  const completeGuidelines = new Map<string, GuidelineLink>()

  const guidelineFilenames = [
    chrome.runtime.getURL('markdowns/example-1.md'),
    chrome.runtime.getURL('markdowns/example-2.md'),
  ]

  for (const filename of guidelineFilenames) {
    const markdownText = await fetchCodingGuidelinesText(filename)
    const markdownTokens = marked.lexer(markdownText)

    const guide = parseMarkdownGuidelines(markdownTokens)
    for (const [key, value] of guide) {
      completeGuidelines.set(key, value)
    }
  }

  return completeGuidelines
}

export const buildGuidelineMapOnline = async (): Promise<Map<string, GuidelineLink>> => {
  const completeGuidelines = new Map<string, GuidelineLink>()

  const guidelineResourceUrls = await getGuidelineUrlResources()
  for (const resourceUrl of guidelineResourceUrls) {
    const markdownText = await fetchCodingGuidelinesText(resourceUrl)
    const markdownTokens = marked.lexer(markdownText)

    const guide = parseMarkdownGuidelines(markdownTokens)
    for (const [key, value] of guide) {
      completeGuidelines.set(key, value)
    }
  }

  return completeGuidelines
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

export const fetchCodingGuidelinesText = async (url: string) => {
  const response = await fetch(url, { method: 'GET', redirect: 'follow' })
  return await response.text()
}

export const fetchCodingGuidelines = async (url: string) => {
  const markdownText = await fetchCodingGuidelinesText(url)
  return marked.lexer(markdownText)
}

const getTableOfContentLinks = (toc: Tokens.List): Tokens.Link[] => {
  const links: Tokens.Link[] = []

  for (const item of toc.items) {
    if (item.type !== 'list_item') continue

    const listItem = item as Tokens.ListItem
    const link = listItem.tokens[0] as Tokens.Text

    if (link.tokens) {
      links.push(link.tokens[0] as Tokens.Link)
    }
  }

  return links
}

const getTableOfContent = (tokens: TokensList): Tokens.List => {
  const firstTocLevel = tokens.find((token) => token.type === 'list') as Tokens.List
  if (isRulesAtLevelOne) return firstTocLevel

  const secondTocLevel = firstTocLevel.items[0].tokens[1] as Tokens.List
  return secondTocLevel
}

export const parseMarkdownGuidelines = (tokens: TokensList): Map<string, GuidelineLink> => {
  const guidelines = new Map<string, GuidelineLink>()

  const toc = getTableOfContent(tokens)
  const links = getTableOfContentLinks(toc)

  for (const link of links) {
    const { text: title, href } = link
    const searchItems = buildSearchItemsForRule({ title, tokens })

    guidelines.set(title, { title, href, searchItems })
  }

  return guidelines
}

type BuildSearchItemsArgs = {
  title: string
  tokens: TokensList
}

const findFirstHeaderIndex = ({ title, tokens }: BuildSearchItemsArgs): number => {
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    if (token.type !== 'heading') continue

    const headingToken = token as Tokens.Heading
    if (headingToken.depth !== RULES_TITLE_LOCATION_DEPTH) continue

    if (headingToken.text !== title) continue

    return i
  }

  return -1
}

const isHeadingTokenWithDepth1 = (token: Tokens.Generic): boolean => {
  if (token.type !== 'heading') return false

  const headingToken = token as Tokens.Heading
  return headingToken.depth === RULES_TITLE_LOCATION_DEPTH
}

const ELEMENTS_TO_IGNORE = [
  'Reference:',
  'References:',
  'Explanation:',
  '### ❌ avoid',
  '### ✅ prefer',
]

const isSearchableToken = (raw: string): boolean => {
  if (ELEMENTS_TO_IGNORE.some((element) => raw.includes(`${element}\n`))) return false

  return true
}

type TokenWithRaw = Tokens.Text | Tokens.Paragraph | Tokens.Code | Tokens.List

const buildSearchItemsForRule = ({ title, tokens }: BuildSearchItemsArgs): string[] => {
  const searchItems = [title]

  const headerIndex = findFirstHeaderIndex({ title, tokens })
  if (headerIndex === -1) return searchItems

  for (let i = headerIndex + 1; i < tokens.length; i++) {
    const searchableToken = tokens[i]

    if (isHeadingTokenWithDepth1(searchableToken)) break
    if (searchableToken.type === 'space') continue

    const tokenWithRawText = searchableToken as TokenWithRaw
    if (!isSearchableToken(tokenWithRawText.raw)) continue

    searchItems.push(tokenWithRawText.raw)
  }

  return searchItems
}

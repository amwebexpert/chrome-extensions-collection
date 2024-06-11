import { type Tokens, type TokensList, marked } from 'marked'
import { MenuItems } from '../models/models'

export const fetchCodingGuidelines = async (url: string) => {
  const response = await fetch(url, { method: 'GET', redirect: 'follow' })
  const markdown = await response.text()

  return marked.lexer(markdown)
}

export const menuItemSendSelection: chrome.contextMenus.CreateProperties = {
  id: MenuItems.SEND_SELECTION,
  title: 'Search in Coding Guidelines',
  contexts: ['selection'],
}

export const getTableOfContent = (tokens: TokensList): Tokens.List =>
  tokens.find((token) => token.type === 'list') as Tokens.List

export const getTableOfContentLinks = (toc: Tokens.List): Tokens.Link[] => {
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

type GuidelineLink = {
  title: string
  href: string
  searchItems: string[]
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
    if (headingToken.depth !== 1) continue

    if (headingToken.text !== title) continue

    return i
  }

  return -1
}

const isHeadingTokenWithDepth1 = (token: Tokens.Generic): boolean => {
  if (token.type !== 'heading') return false

  const headingToken = token as Tokens.Heading
  return headingToken.depth === 1
}

const isSearchableToken = (raw: string): boolean => {
  if (raw.includes('Reference:\n\n')) return false
  if (raw.includes('References:\n\n')) return false
  if (raw.includes('Explanation:\n\n')) return false
  if (raw.startsWith('### ✅ prefer\n\n')) return false
  if (raw.startsWith('### ❌ avoid\n\n')) return false

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

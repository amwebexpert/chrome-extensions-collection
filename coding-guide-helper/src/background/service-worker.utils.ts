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
    const { text, href } = link
    guidelines.set(text, { title: text, href, searchItems: [] })
  }

  return guidelines
}

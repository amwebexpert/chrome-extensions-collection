import { marked } from 'marked'
import { MenuItems } from '../models/models'

export const fetchCodingGuidelines = async (url: string) => {
  const response = await fetch(url)
  const markdown = await response.text()

  const tokens = marked.lexer(markdown)
  return tokens
}

export const menuItemSendSelection: chrome.contextMenus.CreateProperties = {
  id: MenuItems.SEND_SELECTION,
  title: 'Search in Coding Guidelines',
  contexts: ['selection'],
}

import { marked } from 'marked'
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

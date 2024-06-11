import { MenuItems, MessageType } from '../models/models'
import {
  fetchCodingGuidelines,
  menuItemSendSelection,
  parseMarkdownGuidelines,
} from './service-worker.utils'

let popupPort: chrome.runtime.Port | null = null

chrome.runtime.onConnect.addListener((port) => {
  if (port.name !== 'popup') return

  popupPort = port
  popupPort.onDisconnect.addListener(() => {
    popupPort = null
  })
})

chrome.contextMenus.removeAll()
chrome.contextMenus.create(menuItemSendSelection)
chrome.contextMenus.onClicked.addListener((info, tab) => {
  const { menuItemId, selectionText } = info

  if (menuItemId === MenuItems.SEND_SELECTION && tab?.id) {
    chrome.storage.local.set({ search: selectionText })
  }
})

chrome.runtime.onInstalled.addListener((detail) => {
  console.info(`service-worker ${detail.reason}`)
  const url =
    'https://raw.githubusercontent.com/amwebexpert/poc-archiver-bare/master/docs/coding-patterns.md'

  fetchCodingGuidelines(url).then((markdownTokens) => {
    console.info('guidelines markdown', parseMarkdownGuidelines(markdownTokens))
  })
})

chrome.runtime.onMessage.addListener((message) => {
  const { type, payload } = message

  switch (type) {
    case MessageType.SET_SEARCH:
      chrome.storage.local.set({ search: payload })
      popupPort?.postMessage({ type: MessageType.ECHO, payload })
      break
    case MessageType.CONTENT_SCRIPT_STARTED:
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        console.info('content script started', tabs)
      })
      break
    case MessageType.ON_SELECTION_CHANGE:
      console.info(`====>>> selection changed: ${payload}`)
      break

    default:
      console.warn('unhandled message', type)
      break
  }
})

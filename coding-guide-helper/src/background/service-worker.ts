import { MenuItems, MessageType } from '../models/models'
import { fetchCodingGuidelines, menuItemSendSelection } from './service-worker.utils'

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
    console.info('guidelines markdown', markdownTokens)
  })
})

chrome.runtime.onMessage.addListener((message) => {
  const { type, payload } = message
  console.info(`message received ${type}`)

  switch (type) {
    case MessageType.SET_SEARCH:
      chrome.storage.local.set({ search: payload })
      break
    case MessageType.CONTENT_SCRIPT_STARTED:
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        console.info('content script started', tabs)
      })
      break

    default:
      console.warn('unhandled message', type)
      break
  }
})

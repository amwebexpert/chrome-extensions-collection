import { type GuidelineNode, MenuItems, MessageType } from '../models/models'
import { buildOrderedNodes } from './markdown-parser'
import {
  collectOnlineGuidelines,
  debugOrderedNodes,
  filterGuidelines,
  menuItemSendSelection,
} from './service-worker.utils'

// communications with popup
let popupPort: chrome.runtime.Port | null = null
chrome.runtime.onConnect.addListener((port) => {
  if (port.name !== 'popup') return

  popupPort = port
  popupPort.onDisconnect.addListener(() => {
    popupPort = null
  })
})

// context menu
chrome.contextMenus.removeAll()
chrome.contextMenus.create(menuItemSendSelection)
chrome.contextMenus.onClicked.addListener((info, tab) => {
  const { menuItemId, selectionText } = info

  if (menuItemId === MenuItems.SEND_SELECTION && tab?.id) {
    chrome.storage.local.set({ search: selectionText })
  }
})

// service worker startup and guidelines parsing
let rootNode: GuidelineNode
chrome.runtime.onInstalled.addListener((detail) => {
  console.info(`service-worker ${detail.reason}`)

  collectOnlineGuidelines().then((node) => {
    rootNode = node
    debugOrderedNodes(node)
  })
})

// message handling
chrome.runtime.onMessage.addListener((message) => {
  const { type, payload } = message

  switch (type) {
    case MessageType.SET_SEARCH: {
      const search = payload
      chrome.storage.local.set({ search })

      const results = filterGuidelines({ search, rootNode })
      popupPort?.postMessage({ type: MessageType.ON_SEARCH_COMPLETED, payload: results })
      break
    }
    case MessageType.SET_OPTIONS:
      chrome.storage.local.set({ options: payload })
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

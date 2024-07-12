import { type GuidelineNode, MenuItems, MessageType, PortName } from '../models/models'
import {
  collectOnlineGuidelines,
  filterGuidelines,
  menuItemSendSelection,
  storeOrderedNodes,
} from './service-worker.utils'

// communications with popup
let popupPort: chrome.runtime.Port | null = null
chrome.runtime.onConnect.addListener((port) => {
  if (port.name !== PortName.POPUP) return

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
const loadGuidelines = async () => {
  rootNode = await collectOnlineGuidelines()
  storeOrderedNodes(rootNode)
  console.info('====>>> guidelines loaded')
}
chrome.runtime.onInstalled.addListener((detail) => {
  console.info(`service-worker ${detail.reason}`)
  loadGuidelines()
})

const getSenderInfo = (sender: chrome.runtime.MessageSender): string =>
  sender.tab?.id ? `tab ${sender.tab.id}` : 'extension'

// message handling
chrome.runtime.onMessage.addListener((request, sender) => {
  const { type, payload } = request

  switch (type) {
    case MessageType.SET_SEARCH: {
      onSearch(payload)
      break
    }
    case MessageType.SET_OPTIONS:
      chrome.storage.local.set({ options: payload })
      loadGuidelines()
      break
    case MessageType.CONTENT_SCRIPT_STARTED:
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        console.info(`content script started for url: ${tabs[0]?.url}`)
      })
      break
    case MessageType.ON_SELECTION_CHANGE:
      console.info(`====>>> selection changed: ${payload}`)
      break

    default:
      console.warn(`unhandled message received from "${getSenderInfo(sender)}"`, type)
      break
  }
})

const onSearch = async (search: string) => {
  try {
    popupPort?.postMessage({ type: MessageType.ON_SEARCH_LOADING })

    if (!rootNode) await loadGuidelines()    

    chrome.storage.local.set({ search })
    const results = filterGuidelines({ search, rootNode })

    popupPort?.postMessage({ type: MessageType.ON_SEARCH_COMPLETED, payload: results })
  } catch (e) {
    console.error('error on search', e)
    popupPort?.postMessage({ type: MessageType.ON_SEARCH_ERROR, payload: e })
  }
}

import {
  FeatureExtractionEmbeddingsSearcher,
  type GuidelineNode,
  MenuItems,
  MessageType,
  PortName,
  collectOnlineGuidelines,
  filterGuidelines,
  getSenderInfo,
  menuItemSendSelection,
  storeOrderedNodes,
} from '@packages/coding-guide-helper-common'

class ServiceWorker {
  popupPort: chrome.runtime.Port | null = null
  rootNode: GuidelineNode | null = null
  featureExtractionEmbeddingsSearcher = new FeatureExtractionEmbeddingsSearcher()

  constructor() {
    this.init()
  }

  init() {
    this.initPopup()
    this.initContextMenu()
    this.initMessageHandler()

    this.loadGuidelines()
  }

  private initPopup() {
    chrome.runtime.onConnect.addListener((port) => {
      if (port.name !== PortName.POPUP) return

      this.popupPort = port
      this.popupPort.onDisconnect.addListener(() => {
        this.popupPort = null
      })
    })
  }

  private initContextMenu() {
    chrome.contextMenus.removeAll()
    chrome.contextMenus.create(menuItemSendSelection)
    chrome.contextMenus.onClicked.addListener((info, tab) => {
      const { menuItemId, selectionText } = info

      if (menuItemId === MenuItems.SEND_SELECTION && tab?.id) {
        chrome.storage.local.set({ search: selectionText })
      }
    })
  }

  private async loadGuidelines() {
    chrome.storage.local.get('allOrderedNodes', ({ allOrderedNodes }) => {
      if (this.rootNode || !allOrderedNodes) return
      this.rootNode = allOrderedNodes // investigate why this is needed since rootNode is not an array?!
      console.info('====>>> guidelines loaded from cache')
    })

    const rootNode = await collectOnlineGuidelines()
    if (!rootNode) {
      console.error('====>>> guidelines not loaded from web')
      return
    }

    this.rootNode = rootNode
    storeOrderedNodes(rootNode)
    this.featureExtractionEmbeddingsSearcher.init(rootNode)
  }

  private initMessageHandler() {
    chrome.runtime.onMessage.addListener((request, sender) => {
      const { type, payload } = request

      switch (type) {
        case MessageType.SET_SEARCH: {
          this.onSearch(payload)
          break
        }
        case MessageType.SET_OPTIONS:
          chrome.storage.local.set({ options: payload })
          this.loadGuidelines()
          break
        case MessageType.CONTENT_SCRIPT_STARTED:
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            console.info(`content script started for url: ${tabs[0]?.url}`)
          })
          break
        case MessageType.ON_POPUP_OPEN:
          if (!this.rootNode) this.loadGuidelines()
          break
        case MessageType.ON_SELECTION_CHANGE:
          console.info(`====>>> selection changed: ${payload}`)
          break

        default:
          console.warn(`unhandled message received from "${getSenderInfo(sender)}"`, type)
          break
      }
    })
  }

  private async onSearch(search: string) {
    try {
      this.popupPort?.postMessage({ type: MessageType.ON_SEARCH_LOADING })

      if (!this.rootNode) await this.loadGuidelines()
      if (!this.rootNode) throw new Error('guidelines not loaded')

      chrome.storage.local.set({ search })
      const results = filterGuidelines({ search, rootNode: this.rootNode })

      console.info('====>>> launch semantic search...')
      this.featureExtractionEmbeddingsSearcher
        .findRelevantDocument(search)
        .then((semanticResults) => {
          console.info(
            '====>>> semantic search completed. Next step: calling this.popupPort?.postMessage',
            semanticResults,
          )
        })

      this.popupPort?.postMessage({ type: MessageType.ON_SEARCH_COMPLETED, payload: results })
    } catch (e) {
      console.error('error on search', e)
      this.popupPort?.postMessage({ type: MessageType.ON_SEARCH_ERROR, payload: e })
    }
  }
}

const serviceWorker = new ServiceWorker()

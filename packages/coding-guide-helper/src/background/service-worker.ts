import {
  FeatureExtractionEmbeddingsSearcher,
  type GuidelineNode,
  MenuItems,
  MessageType,
  PortName,
  collectOnlineGuidelines,
  combineUniqueSearchResults,
  filterGuidelines,
  getNodesFromRules,
  getSenderInfo,
  menuItemSendSelection,
  storeOrderedNodes,
} from '@packages/coding-guide-helper-common'

class ServiceWorker {
  popupPort: chrome.runtime.Port | null = null
  rootNode: GuidelineNode | null = null
  semanticSearcher = new FeatureExtractionEmbeddingsSearcher()

  constructor() {
    this.init()
  }

  async init() {
    this.loadGuidelines().then(() => this.semanticSearcher.init(this.rootNode))

    this.initPopup()
    this.initContextMenu()
    this.initMessageHandler()
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
    const rootNode = await collectOnlineGuidelines()
    if (!rootNode) {
      console.error('====>>> guidelines not loaded from web')
      return
    }

    this.rootNode = rootNode
    storeOrderedNodes(rootNode)
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
        case MessageType.CREATE_NEXT_EMBEDDINGS:
          this.computeNextEmbeddings()
          break

        default:
          console.warn(`unhandled message received from "${getSenderInfo(sender)}"`, type)
          break
      }
    })
  }

  private async computeNextEmbeddings() {
    await this.semanticSearcher.computeNextRuleEmbedding()
    const payload = this.semanticSearcher.computeEmbeddingsStats
    this.popupPort?.postMessage({ type: MessageType.ON_EMBEDDINGS_CREATED, payload })
  }

  private async getRootNode(): Promise<GuidelineNode> {
    if (!this.rootNode) await this.loadGuidelines()

    const rootNode = this.rootNode
    if (!rootNode) throw new Error('guidelines not loaded')

    return rootNode
  }

  private async filterWithSemantic(search: string): Promise<GuidelineNode[]> {
    if (!search || !this.rootNode || !this.semanticSearcher.isReadyForSemanticSearch) return []

    const rules = await this.semanticSearcher.findRelevantDocuments({ queryText: search, maxResults: 3 })
    return getNodesFromRules({ rootNode: this.rootNode, rules })
  }

  private async onSearch(search: string) {
    try {
      this.popupPort?.postMessage({ type: MessageType.ON_SEARCH_LOADING })

      const rootNode = await this.getRootNode()

      const exactMatches = filterGuidelines({ search, rootNode })
      const semanticResults = await this.filterWithSemantic(search)
      const payload = combineUniqueSearchResults({ exactMatches, semanticResults })

      this.popupPort?.postMessage({ type: MessageType.ON_SEARCH_COMPLETED, payload })
      chrome.storage.local.set({ search })
    } catch (e) {
      console.error('error on search', e)
      this.popupPort?.postMessage({ type: MessageType.ON_SEARCH_ERROR, payload: e })
    }
  }
}

export const serviceWorker = new ServiceWorker()

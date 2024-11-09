import { type ComputeEmbeddingsStats, MessageType } from '@packages/coding-guide-helper-common'
import debounce from 'debounce'

export const generateEmbeddings = () => chrome.runtime.sendMessage({ type: MessageType.CREATE_NEXT_EMBEDDINGS })

export const doSearch = (payload = '') => {
  if (!payload) return
  chrome.runtime.sendMessage({ type: MessageType.SET_SEARCH, payload })
}

export const doSearchDebounced = debounce(doSearch, 500)

export const EMPTY_PROGRESS: ComputeEmbeddingsStats = { completed: 0, total: 0, isCompleted: false, nextRuleTitle: '' }

const popupConnect = () => chrome.runtime.connect({ name: 'popup' })
export const POPUP_PORT = popupConnect()

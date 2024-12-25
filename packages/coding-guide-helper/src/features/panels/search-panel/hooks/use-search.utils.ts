import { sendAsyncMessage } from '@packages/chrome-common'
import { type ComputedEmbeddingsStats, MessageType } from '@packages/coding-guide-helper-common'
import debounce from 'debounce'

export const generateEmbeddings = () => sendAsyncMessage({ type: MessageType.CREATE_NEXT_EMBEDDINGS })

export const doSearch = (payload = '') => {
  if (!payload) return
  sendAsyncMessage({ type: MessageType.SET_SEARCH, payload })
}

export const doSearchDebounced = debounce(doSearch, 500)

export const EMPTY_PROGRESS: ComputedEmbeddingsStats = { completed: 0, total: 0, isCompleted: false, nextRuleTitle: '' }

const popupConnect = () => chrome.runtime.connect({ name: 'popup' })
export const POPUP_PORT = popupConnect()

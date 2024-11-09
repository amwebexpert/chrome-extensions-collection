import {
  type ComputeEmbeddingsStats,
  type GuidelineNode,
  MessageType,
  browserAssistant,
  isAssistantAvailableOnPlatform,
} from '@packages/coding-guide-helper-common'
import debounce from 'debounce'
import { useEffect, useState } from 'react'
import { POPUP_PORT } from '../../../app/app.utils'

const doSearch = (payload: string) => chrome.runtime.sendMessage({ type: MessageType.SET_SEARCH, payload })

const doSearchDebounced = debounce(doSearch, 500)

const EMPTY_PROGRESS: ComputeEmbeddingsStats = { completed: 0, total: 0, isCompleted: false, nextRuleTitle: '' }

export const useSearch = () => {
  const [embeddingsProgress, setEmbeddingsProgress] = useState<ComputeEmbeddingsStats>(EMPTY_PROGRESS)
  const [search, setSearch] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<GuidelineNode[]>([])

  const shouldDisplayComputingProgress = !embeddingsProgress.isCompleted && embeddingsProgress.total > 0

  useEffect(() => {
    // restore search value
    chrome.storage.local.get('search', ({ search }) => setSearch(search ?? ''))

    // listen for worker search results and update the state
    POPUP_PORT.onDisconnect.addListener(() => console.info('popup disconnected'))
    POPUP_PORT.onMessage.addListener((message, _port) => {
      const { type, payload } = message
      switch (type) {
        case MessageType.ON_SEARCH_COMPLETED:
          setSearchResults(payload)
          setIsSearching(false)
          break
        case MessageType.ON_SEARCH_LOADING:
          setIsSearching(true)
          break
        case MessageType.ON_SEARCH_ERROR:
          setIsSearching(false)
          break
        case MessageType.ON_EMBEDDINGS_CREATED: {
          const stats: ComputeEmbeddingsStats = payload
          setEmbeddingsProgress(stats)
          if (!stats.isCompleted) chrome.runtime.sendMessage({ type: MessageType.CREATE_NEXT_EMBEDDINGS })
          break
        }

        default:
          console.warn(`unknown message type: ${type}`, payload)
          break
      }
    })
  }, [])

  useEffect(() => {
    chrome.runtime.sendMessage({ type: MessageType.CREATE_NEXT_EMBEDDINGS })

    if (isAssistantAvailableOnPlatform())
      browserAssistant
        .init()
        .then(() => console.info('====>>> gemini assistant initialized'))
        .catch((error) => console.error('====>>> gemini assistant error', error))
  }, [])

  const launchSearch = () => {
    if (!search) return

    doSearch(search)

    if (isAssistantAvailableOnPlatform())
      browserAssistant
        .promptAssistant(search)
        .then((response) => console.info('====>>> gemini assistant response', response))
        .catch((error) => console.error('====>>> gemini assistant error', error))
  }

  useEffect(() => {
    doSearchDebounced(search)
  }, [search])

  return {
    search,
    setSearch,
    isSearching,
    searchResults,
    launchSearch,
    embeddingsProgress,
    shouldDisplayComputingProgress,
  }
}

import { type ComputeEmbeddingsStats, type GuidelineNode, MessageType } from '@packages/coding-guide-helper-common'
import { useEffect, useState } from 'react'
import { EMPTY_PROGRESS, POPUP_PORT, doSearch, doSearchDebounced, generateEmbeddings } from './use-search.utils'

export const useSearch = () => {
  const [embeddingsProgress, setEmbeddingsProgress] = useState<ComputeEmbeddingsStats>(EMPTY_PROGRESS)
  const shouldDisplayComputingProgress = !embeddingsProgress.isCompleted && embeddingsProgress.total > 0

  const [search, setSearch] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<GuidelineNode[]>([])

  useEffect(() => {
    POPUP_PORT.onMessage.addListener((message) => {
      const { type, payload } = message
      switch (type) {
        case MessageType.ON_SEARCH_COMPLETED: {
          setSearchResults(payload)
          setIsSearching(false)
          break
        }
        case MessageType.ON_SEARCH_LOADING: {
          setIsSearching(true)
          break
        }
        case MessageType.ON_SEARCH_ERROR: {
          setIsSearching(false)
          break
        }
        case MessageType.ON_EMBEDDINGS_CREATED: {
          const stats: ComputeEmbeddingsStats = payload
          setEmbeddingsProgress(stats)
          if (!stats.isCompleted) generateEmbeddings()
          break
        }

        default:
          console.warn(`unknown message type: ${type}`, payload)
      }
    })

    chrome.storage.local.get('search', ({ search }) => setSearch(search ?? ''))

    generateEmbeddings()
  }, [])

  // trigger search on user action
  const launchSearch = () => doSearch(search)

  // trigger search on input value changes
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

import { type ComputeEmbeddingsStats, type GuidelineNode, MessageType } from '@packages/coding-guide-helper-common'
import { useCallback, useEffect, useState } from 'react'
import { POPUP_PORT } from '../../../app/app.utils'
import { EMPTY_PROGRESS, doSearch, doSearchDebounced, generateEmbeddings } from './use-search.utils'

export const useSearch = () => {
  const [embeddingsProgress, setEmbeddingsProgress] = useState<ComputeEmbeddingsStats>(EMPTY_PROGRESS)
  const shouldDisplayComputingProgress = !embeddingsProgress.isCompleted && embeddingsProgress.total > 0

  const [search, setSearch] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<GuidelineNode[]>([])

  // biome-ignore lint/suspicious/noExplicitAny: message comes from port.onMessage as <any>
  const onMessage = useCallback((message: any) => {
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
  }, [])

  useEffect(() => {
    POPUP_PORT.onMessage.addListener(onMessage)
    generateEmbeddings()

    // restore previous user session search value
    chrome.storage.local.get('search', ({ search }) => setSearch(search ?? ''))

    // each time popup connection is lost, try to reconnect?
    POPUP_PORT.onDisconnect.addListener(() => console.info('====>>> disconnected'))
  }, [onMessage])

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

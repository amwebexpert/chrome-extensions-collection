import { useEffect, useState } from 'react'
import { type GuidelineNode, MessageType, PortName } from '../../../models/models'
import { doSearch, doSearchDebounced } from '../app.utils'

const port = chrome.runtime.connect({ name: PortName.POPUP })

export const useSearch = () => {
  const [search, setSearch] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<GuidelineNode[]>([])

  useEffect(() => {
    // restore search value
    chrome.storage.local.get('search', ({ search }) => setSearch(search ?? ''))

    // listen for worker search results and update the state
    port.onMessage.addListener((message, _port) => {
      const { type, payload } = message
      if (type === MessageType.ON_SEARCH_COMPLETED) {
        setSearchResults(payload)
        setTimeout(() => setIsSearching(false), 300)
      }
      if (type === MessageType.ON_SEARCH_LOADING) setIsSearching(true)
      if (type === MessageType.ON_SEARCH_ERROR) setTimeout(() => setIsSearching(false), 300)
    })
  }, [])

  useEffect(() => {
    doSearchDebounced(search)
  }, [search])

  return { search, setSearch, isSearching, searchResults, doSearch }
}

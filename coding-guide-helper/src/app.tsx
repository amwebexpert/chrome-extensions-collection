import { Flex, Input, type InputRef, Space, Typography } from 'antd'
import { type FunctionComponent, useEffect, useRef, useState } from 'react'
import './app.css'
import { doSearch, doSearchDebounced, logPlatformInfo } from './app.utils'
import { SearchResults } from './components/search-results/search-results'
import { Version } from './components/version'
import { type GuidelineNode, MessageType, PortName } from './models/models'

const TITLE = 'Coding guidelines helper'
const port = chrome.runtime.connect({ name: PortName.POPUP })

export const App: FunctionComponent = () => {
  const inputRef = useRef<InputRef>(null)
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState<GuidelineNode[]>([])

  useEffect(() => {
    logPlatformInfo()

    // restore search value
    chrome.storage.local.get('search', ({ search }) => setSearch(search ?? ''))

    // listen for worker search results and update the state
    port.onMessage.addListener((message, _port) => {
      const { type, payload } = message
      if (type === MessageType.ON_SEARCH_COMPLETED) setSearchResults(payload)
    })
  }, [])

  useEffect(() => {
    setTimeout(() => inputRef.current?.select(), 300)
  }, [])

  useEffect(() => {
    doSearchDebounced(search)
  }, [search])

  return (
    <Flex vertical={true} style={{ width: 700, height: 400 }}>
      <Flex gap="middle" vertical={true} flex={1} align="center">
        <Typography.Text strong={true}>{TITLE}</Typography.Text>

        <Space>
          <Input.Search
            ref={inputRef}
            placeholder="input search text"
            autoFocus={true}
            allowClear
            enterButton
            size="large"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onSearch={() => doSearch(search)}
          />
        </Space>

        <Flex className="search-results-container">
          <SearchResults nodes={searchResults.filter((node) => node.shouldDisplayNode)} />
        </Flex>
      </Flex>

      <Version />
    </Flex>
  )
}

export default App

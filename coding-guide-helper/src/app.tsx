import { Flex, Input, type InputRef, Space, Typography } from 'antd'
import debounce from 'debounce'
import { type FunctionComponent, useEffect, useRef, useState } from 'react'
import './app.css'
import { SearchResults } from './components/search-results'
import { Version } from './components/version'
import { type GuidelineNode, MessageType, PortName } from './models/models'

const port = chrome.runtime.connect({ name: PortName.POPUP })

const doSearch = (payload: string) =>
  chrome.runtime.sendMessage({ type: MessageType.SET_SEARCH, payload })

const doSearchDebounced = debounce(doSearch, 500)

export const App: FunctionComponent = () => {
  const inputRef = useRef<InputRef>(null)
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState<GuidelineNode[]>([])

  useEffect(() => {
    chrome.runtime
      .getPlatformInfo()
      .then((info) => console.log('platform info', JSON.stringify(info, null, 2)))

    // restore search value
    chrome.storage.local.get('search', ({ search }) => setSearch(search ?? ''))

    // listen for worker search results and update the state
    port.onMessage.addListener((message, port) => {
      if (port.name !== PortName.POPUP) return

      if (message.type === MessageType.ON_SEARCH_COMPLETED) {
        setSearchResults(message.payload)
        return
      }
    })
  }, [])

  useEffect(() => {
    setTimeout(() => inputRef.current?.select(), 300)
  }, [])

  useEffect(() => {
    doSearchDebounced(search)
  }, [search])

  return (
    <Flex vertical={true} style={{ minWidth: 600, minHeight: 400 }}>
      <Flex gap="middle" vertical={true} flex={1} align="center">
        <Typography.Text strong={true} type="secondary">
          Coding guidelines helper
        </Typography.Text>

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

        <Flex className="container-full">
          <SearchResults nodes={searchResults.filter((node) => node.shouldDisplayNode)} />
        </Flex>
      </Flex>

      <Version />
    </Flex>
  )
}

export default App

import { Flex, Input, type InputRef, Space, Typography } from 'antd'
import { type FunctionComponent, useEffect, useRef } from 'react'
import { SearchResults } from '../search-results/search-results'
import { Version } from '../version/version'
import './app.css'
import { logPlatformInfo } from './app.utils'
import { useSearch } from './use-search'

const TITLE = 'Coding guidelines helper'

export const App: FunctionComponent = () => {
  const inputRef = useRef<InputRef>(null)
  const { search, setSearch, isSearching, searchResults, doSearch } = useSearch()

  useEffect(() => {
    setTimeout(() => inputRef.current?.select(), 300)
    logPlatformInfo()
  }, [])

  return (
    <Flex vertical={true} style={{ width: 700, height: 400 }}>
      <Flex gap="middle" vertical={true} flex={1} align="center">
        <Typography.Text strong={true}>{TITLE}</Typography.Text>

        <Space>
          <Input.Search
            ref={inputRef}
            loading={isSearching}
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

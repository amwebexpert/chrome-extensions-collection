import { Flex, Input, type InputRef, Space } from 'antd'
import { type FunctionComponent, useEffect, useRef } from 'react'
import { SearchResults } from '../../search-results/search-results'
import { useSearch } from './hooks/use-search'
import './search-panel.css'

export const SearchPanel: FunctionComponent = () => {
  const inputRef = useRef<InputRef>(null)
  const { search, setSearch, isSearching, searchResults, doSearch } = useSearch()

  useEffect(() => {
    setTimeout(() => inputRef.current?.select(), 300)
  }, [])

  return (
    <Flex gap="middle" vertical={true} flex={1} align="center">
      <Space>
        <Input.Search
          ref={inputRef}
          loading={isSearching}
          placeholder="input search text"
          autoFocus={true}
          allowClear={true}
          enterButton={false}
          size="middle"
          value={search}
          onKeyDown={(e) => console.debug(`onKeyDown ${e.key}`)}
          onChange={(e) => setSearch(e.target.value)}
          onSearch={() => doSearch(search)}
        />
      </Space>

      <Flex className="search-results-container">
        <SearchResults nodes={searchResults.filter((node) => node.shouldDisplayNode)} />
      </Flex>
    </Flex>
  )
}

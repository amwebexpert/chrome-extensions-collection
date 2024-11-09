import { Flex, Input, type InputRef, Space } from 'antd'
import { type FunctionComponent, useEffect, useRef } from 'react'
import { SearchResults } from '../../../features/search-results/search-results'
import { EmbeddingsComputingProgress } from './embeddings-computing-progress'
import { useSearch } from './hooks/use-search'
import './search-panel.css'

export const SearchPanel: FunctionComponent = () => {
  const inputRef = useRef<InputRef>(null)

  const {
    search,
    setSearch,
    isSearching,
    searchResults,
    launchSearch,
    embeddingsProgress,
    shouldDisplayComputingProgress,
  } = useSearch()

  useEffect(() => {
    setTimeout(() => inputRef.current?.select(), 300)
  }, [])

  if (shouldDisplayComputingProgress) return <EmbeddingsComputingProgress stats={embeddingsProgress} />

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
          onKeyDown={(e) => {
            if (e.key === 'Enter') launchSearch()
          }}
          onChange={(e) => setSearch(e.target.value)}
          onSearch={() => launchSearch()}
        />
      </Space>

      <Flex className="search-results-container">
        <SearchResults nodes={searchResults.filter((node) => node.shouldDisplayNode)} />
      </Flex>
    </Flex>
  )
}

import { Flex, Input, Space } from 'antd'
import type { FunctionComponent } from 'react'
import { SearchResults } from '../../../features/search-results/search-results'
import { EmbeddingsComputingProgress } from './embeddings-computing-progress'
import { useSearch } from './hooks/use-search'
import { useSetFocus } from './hooks/use-set-focus'
import './search-panel.css'

export const SearchPanel: FunctionComponent = () => {
  const inputRef = useSetFocus({ delay: 300 })

  const {
    search,
    setSearch,
    isSearching,
    searchResults,
    launchSearch,
    embeddingsProgress,
    shouldDisplayComputingProgress,
  } = useSearch()

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

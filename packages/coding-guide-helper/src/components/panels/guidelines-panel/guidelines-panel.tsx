import type { GuidelineNode } from '@packages/coding-guide-helper-common'
import { Flex } from 'antd'
import { type FunctionComponent, useEffect, useState } from 'react'
import { SearchResults } from '../../search-results/search-results'
import './guidelines-panel.css'

export const GuidelinesPanel: FunctionComponent = () => {
  const [chapters, setChapters] = useState<GuidelineNode[]>([])

  useEffect(() => {
    chrome.storage.local.get('allOrderedNodes', ({ allOrderedNodes }) => {
      const orderedNodes: GuidelineNode[] = allOrderedNodes
      const chapters = orderedNodes.filter(({ level }) => level === 1)
      setChapters(chapters)
    })
  }, [])

  return (
    <Flex className="guidelines-container">
      <SearchResults nodes={chapters} />
    </Flex>
  )
}

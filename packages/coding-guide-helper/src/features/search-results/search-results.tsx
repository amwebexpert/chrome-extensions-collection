import type { GuidelineNode } from '@packages/coding-guide-helper-common'
import { Collapse } from 'antd'
import type { FunctionComponent } from 'react'

import { SearchResultsTitle } from './search-results-title'

import { MarkdownLines } from '../../components/markdown/markdown-lines'
import './search-results.css'

interface IProps {
  nodes: GuidelineNode[]
}

export const SearchResults: FunctionComponent<IProps> = ({ nodes }) => (
  <Collapse
    className="search-results"
    accordion={false}
    defaultActiveKey={[0]}
    size="small"
    items={nodes.map(({ title, href, markdownLines, children }) => ({
      key: href,
      label: <SearchResultsTitle title={title} href={href} />,
      children: (
        <>
          <MarkdownLines markdownLines={markdownLines} />
          {children && <SearchResults nodes={children} />}
        </>
      ),
    }))}
  />
)

import { Collapse } from 'antd'
import type { FunctionComponent } from 'react'
import type { GuidelineNode } from '../../models/models'

import { SearchResultsMarkdown } from './search-results-markdown'
import { SearchResultsTitle } from './search-results-title'

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
          <SearchResultsMarkdown markdownLines={markdownLines} />
          {children && <SearchResults nodes={children} />}
        </>
      ),
    }))}
  />
)

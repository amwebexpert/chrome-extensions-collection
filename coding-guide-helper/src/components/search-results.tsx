import { Collapse } from 'antd'
import type { FunctionComponent } from 'react'
import type { GuidelineNode } from '../models/models'

import { SearchResultsMarkdown } from './search-results-markdown'
import { SearchResultsTitle } from './search-results-title'

interface IProps {
  nodes: GuidelineNode[]
}

export const SearchResults: FunctionComponent<IProps> = ({ nodes }) => (
  <Collapse
    accordion={true}
    defaultActiveKey={[0]}
    style={{ width: '100%' }}
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

import { Collapse } from 'antd'
import type { FunctionComponent } from 'react'
import Markdown from 'react-markdown'
import type { GuidelineNode } from '../models/models'

import { CodeBlock } from './code-block'
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
    items={nodes.map(({ title, href, markdownLines, children }, index) => ({
      key: index,
      label: <SearchResultsTitle title={title} href={href} />,
      children: (
        <>
          <div className="container-full">
            <Markdown components={{ code: (props) => <CodeBlock {...props} /> }}>
              {markdownLines.join('\n')}
            </Markdown>
          </div>

          {children && <SearchResults nodes={children} />}
        </>
      ),
    }))}
  />
)

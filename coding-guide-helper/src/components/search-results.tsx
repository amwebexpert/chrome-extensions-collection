import { CopyOutlined } from '@ant-design/icons'
import { Collapse, Typography } from 'antd'
import copy from 'copy-to-clipboard'
import type { FunctionComponent } from 'react'
import Markdown from 'react-markdown'
import type { GuidelineNode } from '../models/models'

import { shouldDisplayNode } from './search-results.utils'

interface IProps {
  nodes: GuidelineNode[]
}

export const SearchResults: FunctionComponent<IProps> = ({ nodes }) => {
  const filteredResults = nodes.filter(shouldDisplayNode)

  return (
    <Collapse
      style={{ minWidth: '100%' }}
      items={filteredResults.map(({ title, href, markdownLines, children }) => ({
        key: title,
        label: (
          <Typography.Text>
            {title}
            <CopyOutlined
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                // TODO show toaster
                copy(`Suggestion:\n- [${title}](${href})`)
              }}
            />
          </Typography.Text>
        ),
        children: (
          <>
            <div className="container-full">
              <Markdown>{markdownLines.join('\n')}</Markdown>
            </div>

            {children && <SearchResults nodes={children} />}
          </>
        ),
      }))}
    />
  )
}

import { CopyOutlined } from '@ant-design/icons'
import { Collapse, Typography } from 'antd'
import copy from 'copy-to-clipboard'
import type { FunctionComponent } from 'react'
import Markdown from 'react-markdown'
import type { GuidelineNode } from '../models/models'

interface IProps {
  nodes: GuidelineNode[]
}

export const SearchResults: FunctionComponent<IProps> = ({ nodes }) => {
  return (
    <Collapse
      accordion={true}
      defaultActiveKey={[0]}
      style={{ minWidth: '100%' }}
      items={nodes.map(({ title, href, markdownLines, children }, index) => ({
        key: index,
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

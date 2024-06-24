import { CopyOutlined } from '@ant-design/icons'
import { Collapse, Typography } from 'antd'
import copy from 'copy-to-clipboard'
import type { FunctionComponent } from 'react'
import Markdown from 'react-markdown'
import { useMessage } from '../hooks/use-message'
import type { GuidelineNode } from '../models/models'
import './search-results.css'

interface IProps {
  nodes: GuidelineNode[]
}

type OnCopy = {
  e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  title: string
  href: string
}

export const SearchResults: FunctionComponent<IProps> = ({ nodes }) => {
  const { showInfo, contextHolder } = useMessage()

  const onCopy = ({ e, title, href }: OnCopy) => {
    e.stopPropagation()
    copy(`Suggestion:\n- [${title}](${href})`)
    showInfo('Coding guidelines suggestion with link copied to clipboard')
  }

  return (
    <>
      {contextHolder}

      <Collapse
        accordion={true}
        defaultActiveKey={[0]}
        style={{ minWidth: '100%' }}
        items={nodes.map(({ title, href, markdownLines, children }, index) => ({
          key: index,
          label: (
            <Typography.Text>
              {title}

              <span className="actionCopy">
                <CopyOutlined onClick={(e) => onCopy({ e, title, href })} />
              </span>
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
    </>
  )
}

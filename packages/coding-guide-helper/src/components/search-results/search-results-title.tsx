import { CopyOutlined } from '@ant-design/icons'
import type { TocLink } from '@packages/coding-guide-helper-common'
import { Typography } from 'antd'
import copy from 'copy-to-clipboard'
import type { FunctionComponent } from 'react'
import { useMessage } from '../../hooks/use-message'
import { sendMessageToContentScript } from './search-results-title-utils'
import './search-results-title.css'

export const SearchResultsTitle: FunctionComponent<TocLink> = ({ title, href }) => {
  const { showInfo, contextHolder } = useMessage()

  const onCopy = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation()

    const info = `Suggestion:\n- [${title}](${href})`
    copy(info)
    showInfo('Coding guidelines suggestion with link copied to clipboard')
    sendMessageToContentScript(info)
  }

  return (
    <Typography.Text>
      {title}

      <span className="actionCopy">
        <CopyOutlined onClick={onCopy} />
      </span>

      {contextHolder}
    </Typography.Text>
  )
}

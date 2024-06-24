import { CopyOutlined } from '@ant-design/icons'
import { Typography } from 'antd'
import copy from 'copy-to-clipboard'
import type { FunctionComponent } from 'react'
import { useMessage } from '../../hooks/use-message'
import './search-results-title.css'

interface IProps {
  title: string
  href: string
}

type OnCopy = {
  e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  title: string
  href: string
}

export const SearchResultsTitle: FunctionComponent<IProps> = ({ title, href }) => {
  const { showInfo, contextHolder } = useMessage()

  const onCopy = ({ e, title, href }: OnCopy) => {
    e.stopPropagation()
    copy(`Suggestion:\n- [${title}](${href})`)
    showInfo('Coding guidelines suggestion with link copied to clipboard')
  }
  return (
    <Typography.Text>
      {title}

      <span className="actionCopy">
        <CopyOutlined onClick={(e) => onCopy({ e, title, href })} />
      </span>

      {contextHolder}
    </Typography.Text>
  )
}

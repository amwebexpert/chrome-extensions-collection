import type { FunctionComponent } from 'react'
import Markdown from 'react-markdown'
import { CodeBlock } from '../code-block/code-block'

interface IProps {
  markdownLines: string[]
}

export const MarkdownLines: FunctionComponent<IProps> = ({ markdownLines }) => (
  <Markdown components={{ code: (props) => <CodeBlock {...props} /> }}>{markdownLines.join('\n')}</Markdown>
)

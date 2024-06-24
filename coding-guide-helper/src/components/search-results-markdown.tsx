import type { FunctionComponent } from 'react'
import Markdown from 'react-markdown'
import { CodeBlock } from './code-block'

interface IProps {
  markdownLines: string[]
}

export const SearchResultsMarkdown: FunctionComponent<IProps> = ({ markdownLines }) => (
  <Markdown components={{ code: (props) => <CodeBlock {...props} /> }}>
    {markdownLines.join('\n')}
  </Markdown>
)

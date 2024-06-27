import type { ClassAttributes, FunctionComponent, HTMLAttributes } from 'react'
import type { ExtraProps } from 'react-markdown'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yDark as dark, coy as light } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useDarkTheme } from '../theme/use-dark-theme'
import { extractLanguageFromClassName } from './code-block.utils'

type Props = ClassAttributes<HTMLElement> & HTMLAttributes<HTMLElement> & ExtraProps

export const CodeBlock: FunctionComponent<Props> = ({ children, className, ...rest }) => {
  const { isDarkMode } = useDarkTheme()
  const style = isDarkMode ? dark : light

  const language = extractLanguageFromClassName(className)

  if (language) {
    return (
      <SyntaxHighlighter {...rest} PreTag="div" language={language} style={style} ref={undefined}>
        {String(children)}
      </SyntaxHighlighter>
    )
  }

  return (
    <code {...rest} className={className}>
      {children}
    </code>
  )
}

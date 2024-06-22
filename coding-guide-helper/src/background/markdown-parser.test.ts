import * as fs from 'node:fs'
import * as path from 'node:path'
import { splitTocAndContent } from './markdown-parser'

import { marked } from 'marked'

const file = path.join(__dirname, '../../', 'public/markdowns/example-1.md')
const markdownText = fs.readFileSync(file, 'utf8')

describe('markdown parser tests suite', () => {
  it('should extract markdown TOC', () => {
    // arrange

    // act
    const markdownTokens = marked.lexer(markdownText)

    // assert
    expect(markdownTokens.length).toBeGreaterThan(0)
  })

  it('should extract markdown TOC and content', () => {
    // arrange

    // act
    const { toc, content } = splitTocAndContent(markdownText)

    // assert
    expect(toc).toBeDefined()
    expect(content).toBeDefined()
  })
})

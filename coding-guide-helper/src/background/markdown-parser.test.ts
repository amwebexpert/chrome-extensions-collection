import * as fs from 'node:fs'
import * as path from 'node:path'

import { marked } from 'marked'

describe('markdown parser tests suite', () => {
  it('should extract markdown TOC', async () => {
    // arrange
    const file = path.join(__dirname, '../../', 'public/markdowns/example-1.md')
    const markdownText = fs.readFileSync(file, 'utf8')

    // act
    const markdownTokens = marked.lexer(markdownText)

    // assert
    expect(markdownTokens.length).toBeGreaterThan(0)
  })
})

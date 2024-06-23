import * as fs from 'node:fs'
import * as path from 'node:path'
import {
  type GuidelineNode,
  buildGuidelineLinksFromTocText,
  buildOrderedNodes,
  createFullGuidelines,
  jsonSerializeReplacer,
  populateMarkdownLinesFromContent,
  splitTocAndContent,
} from './markdown-parser'

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

  it('should build guideline links from TOC', () => {
    // arrange
    const { toc } = splitTocAndContent(markdownText)

    // act
    const tocLinks = buildGuidelineLinksFromTocText(toc)

    // assert
    expect(tocLinks).toBeDefined()
    console.info('====>>> tocLinks', JSON.stringify(tocLinks, jsonSerializeReplacer, 2))
  })

  it('should return all ordered aodes', () => {
    // arrange
    const { toc } = splitTocAndContent(markdownText)
    const rootNode = buildGuidelineLinksFromTocText(toc)
    const allOrderedNodes: GuidelineNode[] = []

    // act
    buildOrderedNodes({ node: rootNode, allOrderedNodes })

    // assert
    expect(allOrderedNodes).toBeDefined()
  })

  it('should populate markdown lines from content', () => {
    // arrange
    const { toc, content } = splitTocAndContent(markdownText)
    const rootNode = buildGuidelineLinksFromTocText(toc)
    const allOrderedNodes: GuidelineNode[] = []
    buildOrderedNodes({ node: rootNode, allOrderedNodes })

    // act
    populateMarkdownLinesFromContent({ allOrderedNodes, content })

    // assert
    expect(rootNode).toBeDefined()
  })

  it('should create full guidelines', () => {
    // arrange
    const allOrderedNodes: GuidelineNode[] = []

    // act
    const rootNode = createFullGuidelines(markdownText)
    buildOrderedNodes({ node: rootNode, allOrderedNodes })

    // assert
    expect(rootNode).toBeDefined()
    console.info(
      '====>>> tocLinks',
      allOrderedNodes.map((node) => `${node.titleMarkdown}\n${node.markdownLines.join('\n    ')}`),
    )
  })
})

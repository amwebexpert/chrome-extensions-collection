import * as fs from 'node:fs'
import * as path from 'node:path'
import {
  buildGuidelineLinksFromTocText,
  buildNode,
  buildOrderedNodes,
  createGuidelineNodes,
  parseTocLine,
  populateMarkdownLinesFromContent,
  splitTocAndContent,
} from './markdown-parser'

import type { GuidelineNode } from '../models/models'

const file = path.join(__dirname, '../../', 'public/markdowns/example-1.md')
const markdownText = fs.readFileSync(file, 'utf8')

describe('markdown parser tests suite', () => {
  describe('parseTocLine', () => {
    it('should parse TOC line of level 1', () => {
      // arrange
      const line = '- [Project coding standards](#project-coding-standards)'

      // act
      const { title, level, href } = parseTocLine(line)

      // assert
      expect(title).toBe('Project coding standards')
      expect(level).toBe(1)
      expect(href).toBe('project-coding-standards')
    })

    it('should parse TOC line of level 2', () => {
      // arrange
      const line = '  - [avoid `{renderAbc()}` pattern](#avoid-renderabc-pattern)'

      // act
      const { title, level, href } = parseTocLine(line)

      // assert
      expect(title).toBe('avoid `{renderAbc()}` pattern')
      expect(level).toBe(2)
      expect(href).toBe('avoid-renderabc-pattern')
    })

    it('should parse TOC line of level 3', () => {
      // arrange
      const line = '    - [✅ prefer usage of `[].includes(...)`](#-prefer-usage-of-includes)'

      // act
      const { title, level, href } = parseTocLine(line)

      // assert
      expect(title).toBe('✅ prefer usage of `[].includes(...)`')
      expect(level).toBe(3)
      expect(href).toBe('-prefer-usage-of-includes')
    })
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
    const rootNode: GuidelineNode = buildNode({ level: 0, title: 'TOC', href: '' })
    const { toc } = splitTocAndContent(markdownText)

    // act
    const tocLinks = buildGuidelineLinksFromTocText({ rootNode, text: toc })

    // assert
    expect(tocLinks).toBeDefined()
  })

  it('should return all ordered aodes', () => {
    // arrange
    const rootNode: GuidelineNode = buildNode({ level: 0, title: 'TOC', href: '' })
    const { toc } = splitTocAndContent(markdownText)
    buildGuidelineLinksFromTocText({ rootNode, text: toc })
    const allOrderedNodes: GuidelineNode[] = []

    // act
    buildOrderedNodes({ node: rootNode, allOrderedNodes })

    // assert
    expect(allOrderedNodes).toBeDefined()
  })

  it('should populate markdown lines from content', () => {
    // arrange
    const rootNode: GuidelineNode = buildNode({ level: 0, title: 'TOC', href: '' })
    const { toc, content } = splitTocAndContent(markdownText)
    buildGuidelineLinksFromTocText({ rootNode, text: toc })
    const allOrderedNodes: GuidelineNode[] = []
    buildOrderedNodes({ node: rootNode, allOrderedNodes })

    // act
    populateMarkdownLinesFromContent({ allOrderedNodes, content })

    // assert
    expect(rootNode).toBeDefined()
  })

  it('should create full guidelines', () => {
    // arrange
    const rootNode: GuidelineNode = buildNode({ level: 0, title: 'TOC', href: '' })
    const allOrderedNodes: GuidelineNode[] = []

    // act
    createGuidelineNodes({ rootNode, text: markdownText })
    buildOrderedNodes({ node: rootNode, allOrderedNodes })

    // assert
    expect(rootNode).toBeDefined()
    console.info(
      '====>>> tocLinks',
      allOrderedNodes.map((node) => `${node.titleMarkdown}\n${node.markdownLines.join('\n    ')}`),
    )
  })
})

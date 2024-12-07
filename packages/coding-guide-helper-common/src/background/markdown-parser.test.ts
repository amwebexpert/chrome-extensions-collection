import * as fs from 'node:fs'
import * as path from 'node:path'
import {
  buildGuidelineNodesFromToC,
  buildNode,
  buildOrderedNodes,
  createGuidelineNodes,
  parseTocLine,
  populateGuidelineNodesSearchableContent,
  splitTocAndContent,
} from './markdown-parser'

import type { GuidelineNode } from '../models/models'

const file = path.join(
  __dirname,
  '../../../../packages/',
  './coding-guide-helper/public/markdowns/common-coding-patterns.md',
)
const markdownText = fs.readFileSync(file, 'utf8')
const baseUrl = 'https://github.com/org/repo/docs/markdown-1.md'
const ROOT_NODE_ATTRIBUTES = { level: 0, title: 'TOC', href: '', baseUrl }

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
    const { toc, content } = splitTocAndContent({ text: markdownText, baseUrl })

    // assert
    expect(toc).toBeDefined()
    expect(content).toBeDefined()
  })

  it('should build guideline links from TOC', () => {
    // arrange
    const rootNode: GuidelineNode = buildNode(ROOT_NODE_ATTRIBUTES)
    const { toc } = splitTocAndContent({ text: markdownText, baseUrl })

    // act
    const tocLinks = buildGuidelineNodesFromToC({ rootNode, text: toc, baseUrl })

    // assert
    expect(tocLinks).toBeDefined()
  })

  it('should return all ordered aodes', () => {
    // arrange
    const rootNode: GuidelineNode = buildNode(ROOT_NODE_ATTRIBUTES)
    const { toc } = splitTocAndContent({ text: markdownText, baseUrl })
    buildGuidelineNodesFromToC({ rootNode, text: toc, baseUrl })

    // act
    const allOrderedNodes = buildOrderedNodes({ node: rootNode })

    // assert
    expect(allOrderedNodes).toBeDefined()
  })

  it('should populate markdown lines from content', () => {
    // arrange
    const rootNode: GuidelineNode = buildNode(ROOT_NODE_ATTRIBUTES)
    const { toc, content } = splitTocAndContent({ text: markdownText, baseUrl })
    buildGuidelineNodesFromToC({ rootNode, text: toc, baseUrl })
    const allOrderedNodes = buildOrderedNodes({ node: rootNode })

    // act
    populateGuidelineNodesSearchableContent({ allOrderedNodes, content })

    // assert
    expect(rootNode).toBeDefined()
  })

  it('should create full guidelines', () => {
    // arrange
    const rootNode: GuidelineNode = buildNode(ROOT_NODE_ATTRIBUTES)

    // act
    createGuidelineNodes({ rootNode, text: markdownText, baseUrl })

    // assert
    expect(rootNode).toBeDefined()

    // debug ordered nodes
    const allOrderedNodes = buildOrderedNodes({ node: rootNode })
    const debugInfo = allOrderedNodes.map((node) => `${node.titleMarkdown}\n${node.markdownLines.join('\n    ')}`)
    //console.info('====>>> nodes', debugInfo)
  })
})

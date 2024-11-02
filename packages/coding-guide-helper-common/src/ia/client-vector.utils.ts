import { buildOrderedNodes, cloneAndRemoveAllParents } from '../background/markdown-parser'
import type { GuidelineNode } from '../models/models'
import type { Rule } from './models'

type NodesFromRulesArgs = {
  rootNode?: GuidelineNode | null
  rules: Rule[]
}

export const getNodesFromRules = ({ rootNode, rules }: NodesFromRulesArgs): GuidelineNode[] => {
  if (!rootNode) return []

  const clonedRoot = cloneAndRemoveAllParents(rootNode)
  const allOrderedNodes = buildOrderedNodes({ node: clonedRoot })
  const hrefs = rules.map((rule) => rule.href)

  const results = allOrderedNodes.filter(({ href }) => hrefs.includes(href))

  for (const result of results) {
    result.isMatching = true
    result.shouldDisplayNode = true
  }

  return results
}

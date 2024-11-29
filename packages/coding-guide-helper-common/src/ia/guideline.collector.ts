import type { GuidelineNode } from '../models/models'
import type { Rule } from './models'

export const isAvoidOrPreferTitle = (title: string): boolean =>
  title.startsWith('❌ Avoid') || title.startsWith('✅ Prefer')

const extractRuleContent = (node: GuidelineNode): string => {
  const content = node.children
    .map(({ title, markdownLines }) => {
      const lines = markdownLines.join('\n')
      return `${title}\n${lines}`
    })
    .join('\n')

  return content
}

export const extractFullRule = (node: GuidelineNode): Rule => {
  const { title, href } = node
  const content = extractRuleContent(node)

  return { title, href, content }
}

export const loadRules = (guidelineNode: GuidelineNode): Rule[] => {
  const rules: Rule[] = []
  for (const child of guidelineNode.children) {
    rules.push(extractFullRule(child))
  }

  return rules
}

export const loadAllRules = (rootNode: GuidelineNode): Rule[] => {
  const rules: Rule[] = []

  for (const guidelineNode of rootNode.children) {
    const guidelineNodeRules = loadRules(guidelineNode)
    rules.push(...guidelineNodeRules)
  }

  return rules
}

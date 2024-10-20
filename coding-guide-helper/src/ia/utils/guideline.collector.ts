import type { GuidelineNode } from '../../models/models'
import type { Rule } from '../models/models'

export const extractFullRule = (node: GuidelineNode): Rule => {
  const title = node.titleMarkdown

  const content = node.children
    .map((child) => `${child.titleMarkdown}\n${child.markdownLines.join('\n')}`)
    .join('\n')

  return { title, content }
}

export const loadRules = async (guidelineNode: GuidelineNode): Promise<Rule[]> => {
  const rules: Rule[] = []
  for (const child of guidelineNode.children) {
    rules.push(extractFullRule(child))
  }

  return rules
}

import type { GuidelineNode } from '../../models/models'
import type { Rule } from '../models/models'

const isAvoidOrPreferTitle = (title: string): boolean =>
  title.startsWith('❌ Avoid') || title.startsWith('✅ Prefer')

export const extractFullRule = (node: GuidelineNode): Rule => {
  const { title } = node

  const content = node.children
    .map(({ title }) => title)
    .filter(isAvoidOrPreferTitle)
    .join('\n')
  // console.info('====>>> content', { title, content })

  return { title, content }
}

export const loadRules = async (guidelineNode: GuidelineNode): Promise<Rule[]> => {
  const rules: Rule[] = []
  for (const child of guidelineNode.children) {
    rules.push(extractFullRule(child))
  }

  return rules
}

import type { GuidelineNode } from '../../models/models'
import type { Rule } from '../models/models'

export const isAvoidOrPreferTitle = (title: string): boolean =>
  title.startsWith('❌ Avoid') || title.startsWith('✅ Prefer')

export const extractFullRule = (node: GuidelineNode): Rule => {
  const { title, href } = node

  const content = node.children
    .map(({ title, markdownLines }) => `${title}\n${markdownLines.join('\n')}`)
    .join('\n')
  //console.info('====>>> content', { title, content })

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

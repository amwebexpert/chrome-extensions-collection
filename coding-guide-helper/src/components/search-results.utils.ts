import type { GuidelineNode } from '../models/models'

export const shouldDisplayNode = (node: GuidelineNode): boolean => {
  if (node.isMatching) return true

  return node.children.some((child) => {
    if (isGuidelineAvoidSection(child) && child.isMatching) return true
    if (isGuidelinePreferSection(child) && child.isMatching) return true

    return false
  })
}

export const isGuidelineAvoidSection = (node: GuidelineNode): boolean =>
  node.title.toLowerCase().includes('❌ avoid')

export const isGuidelinePreferSection = (node: GuidelineNode): boolean =>
  node.title.toLowerCase().includes('✅ prefer')

import type { GuidelineNode } from '../models/models'

export const shouldDisplayNode = (node: GuidelineNode): boolean => {
  return node.isMatching ?? false
  // if (node.isMatching) return true

  // return node.children.some(shouldDisplayNode)
}

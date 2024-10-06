import type { GuidelineNode } from '../src/models/models'
import { collectOnlineGuidelines } from './../src/background/service-worker.utils'

const main = async () => {
  const rules = await loadRules()
  for (const rule of rules) {
    console.log(rule.title)
    console.info(`\t====>>> ${rule.content.slice(0, 100)}...`)
  }
}

type Rule = {
  title: string
  content: string
}

const extractFullRule = (node: GuidelineNode): Rule => {
  const title = node.titleMarkdown

  const content = node.children
    .map((child) => `${child.titleMarkdown}\n${child.markdownLines.join('\n')}`)
    .join('\n')

  return { title, content }
}

const loadRules = async (): Promise<Rule[]> => {
  const rootNode = await collectOnlineGuidelines()
  const tsCodingGuidelines: GuidelineNode = rootNode.children[0] // 1st one is TS coding guidelines

  const rules: Rule[] = []
  for (const child of tsCodingGuidelines.children) {
    rules.push(extractFullRule(child))
  }

  return rules
}

main()

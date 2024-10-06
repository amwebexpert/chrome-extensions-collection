import { collectOnlineGuidelines } from '../src/background/service-worker.utils'
import type { GuidelineNode } from '../src/models/models'

import { ChromaClient } from 'chromadb'

const main = async () => {
  const rules = await loadRules()

  const client = new ChromaClient()

  const collection = await client.getOrCreateCollection({ name: 'codingGuidelinesCollection' })

  await collection.upsert({
    documents: rules.map((rule) => rule.content),
    ids: rules.map((rule) => rule.title),
    metadatas: rules.map((rule) => ({ title: rule.title })),
  })

  const results = await collection.query({
    queryTexts: 'many args position',
    nResults: 1,
  })

  console.log(results.metadatas)
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

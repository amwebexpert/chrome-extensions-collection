import { collectOnlineGuidelines } from '../src/background/service-worker.utils'
import type { GuidelineNode } from '../src/models/models'
import { loadRules } from './../src/ia/utils/guideline.collector'

// @see https://github.com/chroma-core/chroma
import { ChromaClient } from 'chromadb'

const main = async () => {
  const rootNode = await collectOnlineGuidelines()
  const tsCodingGuidelines: GuidelineNode = rootNode.children[0] // 1st one is TS coding guidelines
  const rules = loadRules(tsCodingGuidelines)

  const client = new ChromaClient()
  const collection = await client.getOrCreateCollection({ name: 'codingGuidelinesCollection' })

  await collection.upsert({
    documents: rules.map((rule) => rule.content),
    ids: rules.map((rule) => rule.title),
    metadatas: rules.map((rule) => ({ title: rule.title })),
  })

  const results = await collection.query({
    // queryTexts: 'ternary abuse',
    // queryTexts: 'many args position',
    queryTexts: 'multiple values comparison',
    nResults: 1,
  })

  console.log(results.metadatas)
}

main()

import { collectOnlineGuidelines } from '../background/service-worker.utils'
import { loadAllRules } from '../ia/guideline.collector'

// @see https://github.com/chroma-core/chroma
import { ChromaClient } from 'chromadb'
import { SAMPLE_QUERIES } from './queries.utils'

const main = async () => {
  const rootNode = await collectOnlineGuidelines()
  const rules = loadAllRules(rootNode)

  const client = new ChromaClient()
  const collection = await client.getOrCreateCollection({ name: 'codingGuidelinesCollection' })

  await collection.upsert({
    documents: rules.map((rule) => rule.content),
    ids: rules.map((rule, index) => `${index + 1}-${rule.title}`),
    metadatas: rules.map((rule) => ({ title: rule.title })),
  })

  for (const queryTexts of SAMPLE_QUERIES) {
    const results = await collection.query({ queryTexts, nResults: 1 })
    console.info(`====>>> match for "${queryTexts}"`, results.metadatas)
  }
}

main()

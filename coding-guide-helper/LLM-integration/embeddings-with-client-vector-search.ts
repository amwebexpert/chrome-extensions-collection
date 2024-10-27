import { EmbeddingIndex, getEmbedding } from 'client-vector-search'
import { collectOnlineGuidelines } from '../src/background/service-worker.utils'
import { loadAllRules } from '../src/ia/utils/guideline.collector'
import { QUERIES } from './queries.utils'

const main = async () => {
  const rootNode = await collectOnlineGuidelines()
  const rules = loadAllRules(rootNode)

  for (const rule of rules) {
    rule.embedding = await getEmbedding(rule.content)
  }

  const initialObjects = rules.map((rule, index) => ({
    id: index,
    name: rule.title,
    embedding: rule.embedding,
  }))
  const index = new EmbeddingIndex(initialObjects)
  // await index.saveIndex('indexedDB')

  for (const queryTexts of QUERIES) {
    const queryEmbedding = await getEmbedding(queryTexts)

    const results = await index.search(queryEmbedding, {
      topK: 1,
      // useStorage: 'indexedDB',
      // storageOptions: { // use only if you overrode the defaults
      //   indexedDBName: 'clientVectorDB',
      //   indexedDBObjectStoreName: 'ClientEmbeddingStore',
      // },
    })

    console.info(`====>>> match for "${queryTexts}"`, results[0].object)
  }

  // await index.deleteIndexedDB()
}

main()

import { EmbeddingIndex, getEmbedding } from 'client-vector-search'
import { collectOnlineGuidelines } from '../background/service-worker.utils'
import { loadAllRules } from '../ia/guideline.collector'
import { SAMPLE_QUERIES } from './queries.utils'

const main = async () => {
  const rootNode = await collectOnlineGuidelines()
  const rules = loadAllRules(rootNode)

  for (const rule of rules) {
    rule.embedding = await getEmbedding(rule.content)
  }

  const initialObjects = rules.map((rule, index) => ({ id: index, ...rule }))
  const index = new EmbeddingIndex(initialObjects)
  // await index.saveIndex('indexedDB')

  for (const queryTexts of SAMPLE_QUERIES) {
    const queryEmbedding = await getEmbedding(queryTexts)

    const results = await index.search(queryEmbedding, {
      topK: 1,
      // useStorage: 'indexedDB',
      // storageOptions: { // use only if you overrode the defaults
      //   indexedDBName: 'clientVectorDB',
      //   indexedDBObjectStoreName: 'ClientEmbeddingStore',
      // },
    })

    const { id, title, href } = results[0].object
    console.info(`====>>> match for "${queryTexts}"`, { id, title, href })
  }

  // await index.deleteIndexedDB()
}

main()

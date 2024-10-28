import { EmbeddingIndex, getEmbedding } from 'client-vector-search'
import { collectOnlineGuidelines } from '../../background/service-worker.utils'
import type { GuidelineNode } from '../../models/models'
import { loadAllRules } from '../utils/guideline.collector'

class ClientVectorSearcher {
  index: EmbeddingIndex | null = null
  rootNode: GuidelineNode | null = null

  async init() {
    this.reset()

    const rootNode = await collectOnlineGuidelines() // TODO get from local storage cache (or axios cache)
    if (!rootNode.children?.length) throw Error('Cannot load guidelines')

    this.rootNode = rootNode

    const rules = loadAllRules(rootNode)

    // Note: when running this on a browser we are getting the following error:
    // ==> Uncaught (in promise) Error: no available backend found.
    //     ERR: [wasm] RuntimeError: Aborted(CompileError: WebAssembly.instantiate():
    //     Refused to compile or instantiate WebAssembly module because neither 'wasm-eval' nor 'unsafe-eval' is
    //     an allowed source of script in the following Content Security Policy directive: "script-src 'self'").
    for (const rule of rules) {
      rule.embedding = await getEmbedding(rule.content)
    }

    console.info('====>>> info', rules)

    const initialObjects = rules.map((rule, i) => ({ id: i, ...rule }))
    this.index = new EmbeddingIndex(initialObjects)
  }

  async reset() {
    if (!this.index) return

    await this.index.deleteIndexedDB()
    this.index = null
    this.rootNode = null
  }

  async findMostRelevantNodes(queryTexts: string): Promise<GuidelineNode[]> {
    if (!this.index) return []

    const queryEmbedding = await getEmbedding(queryTexts)
    const results = await this.index.search(queryEmbedding, {
      topK: 3,
      // useStorage: 'indexedDB',
      // storageOptions: { // use only if you overrode the defaults
      //   indexedDBName: 'clientVectorDB',
      //   indexedDBObjectStoreName: 'ClientEmbeddingStore',
      // },
    })

    return results.map((result) => result.object)
  }
}

export const semanticSearcher = new ClientVectorSearcher()

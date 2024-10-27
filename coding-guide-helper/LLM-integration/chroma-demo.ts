import { collectOnlineGuidelines } from '../src/background/service-worker.utils'
import type { GuidelineNode } from '../src/models/models'

import { ChromaClient } from 'chromadb'
const client = new ChromaClient()

// switch `createCollection` to `getOrCreateCollection` to avoid creating a new collection every time
const collection = await client.getOrCreateCollection({
  name: 'my_collection',
})

// switch `addRecords` to `upsertRecords` to avoid adding the same documents every time
await collection.upsert({
  documents: [
    'This story is about a prince',
    'This is a story about a dog and a cat',
    'This is a story about a dog and a mouse',
  ],
  ids: ['id1', 'id2', 'id3'],
})

const results = await collection.query({
  queryTexts: 'a nice princess', // Chroma will embed this for you
  nResults: 1, // how many results to return
})

console.log(results)

import { collectOnlineGuidelines } from '../background/service-worker.utils'
import { FeatureExtractionEmbeddingsSearcher } from '../ia/client-vector-searcher'
import { setLocalDevMode } from '../utils/env.utils'
import { writeLocalTextFile } from '../utils/files.utils'
import { SAMPLE_QUERIES } from './queries.utils'

export const main = async () => {
  setLocalDevMode()

  const rootNode = await collectOnlineGuidelines()
  const featureExtractionEmbeddingsSearcher = new FeatureExtractionEmbeddingsSearcher()
  await featureExtractionEmbeddingsSearcher.init(rootNode)

  for (const rule of featureExtractionEmbeddingsSearcher.rules) {
    const { title, content } = rule
    writeLocalTextFile({ title, content })
  }

  await featureExtractionEmbeddingsSearcher.computeAllEmbeddings()

  const maxResults = 3
  for (const queryText of SAMPLE_QUERIES) {
    const rules = await featureExtractionEmbeddingsSearcher.findRelevantDocuments({
      queryText,
      maxResults,
    })

    if (!rules.length) {
      console.info(`====>>> no match for "${queryText}"`)
      continue
    }

    console.info(
      `====>>> best ${maxResults} matches for "${queryText}"`,
      rules.map((rule) => rule.title),
    )
  }
}

main()

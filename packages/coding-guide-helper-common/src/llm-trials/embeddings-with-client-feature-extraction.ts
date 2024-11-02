import { collectOnlineGuidelines } from '../background/service-worker.utils'
import { FeatureExtractionEmbeddingsSearcher } from '../ia/client-vector-searcher'
import { SAMPLE_QUERIES } from './queries.utils'

const main = async () => {
  const rootNode = await collectOnlineGuidelines()
  const featureExtractionEmbeddingsSearcher = new FeatureExtractionEmbeddingsSearcher()
  await featureExtractionEmbeddingsSearcher.init(rootNode)

  const maxResults = 3
  for (const queryTexts of SAMPLE_QUERIES) {
    const rules = await featureExtractionEmbeddingsSearcher.findRelevantDocuments({
      queryTexts,
      maxResults,
    })

    if (!rules.length) {
      console.info(`====>>> no match for "${queryTexts}"`)
      continue
    }

    console.info(
      `====>>> best ${maxResults} matches for "${queryTexts}"`,
      rules.map((rule) => rule.title),
    )
  }
}

main()

import { collectOnlineGuidelines } from '../background/service-worker.utils'
import { FeatureExtractionEmbeddingsSearcher } from '../ia/client-vector-searcher'
import { SAMPLE_QUERIES } from './queries.utils'

const main = async () => {
  const rootNode = await collectOnlineGuidelines()
  const featureExtractionEmbeddingsSearcher = new FeatureExtractionEmbeddingsSearcher()
  await featureExtractionEmbeddingsSearcher.init(rootNode)

  for (const queryTexts of SAMPLE_QUERIES) {
    const rules = await featureExtractionEmbeddingsSearcher.findRelevantDocuments(queryTexts)

    if (!rules.length) {
      console.info(`====>>> no match for "${queryTexts}"`)
      continue
    }

    console.info(
      `================>>> match for "${queryTexts}"`,
      rules.map((rule) => rule.title),
    )
  }
}

main()

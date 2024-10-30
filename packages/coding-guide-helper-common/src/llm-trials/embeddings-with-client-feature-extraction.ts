import { collectOnlineGuidelines } from '../background/service-worker.utils'
import { FeatureExtractionEmbeddingsSearcher } from '../ia/client-vector-searcher'
import { SAMPLE_QUERIES } from './queries.utils'

const main = async () => {
  const rootNode = await collectOnlineGuidelines()
  const featureExtractionEmbeddingsSearcher = new FeatureExtractionEmbeddingsSearcher()
  await featureExtractionEmbeddingsSearcher.init(rootNode)

  for (const queryTexts of SAMPLE_QUERIES) {
    const rule = await featureExtractionEmbeddingsSearcher.findRelevantDocument(queryTexts)

    if (!rule) {
      console.info(`====>>> no match for "${queryTexts}"`)
      continue
    }

    const { title, href } = rule
    console.info(`====>>> match for "${queryTexts}"`, { title, href })
  }
}

main()

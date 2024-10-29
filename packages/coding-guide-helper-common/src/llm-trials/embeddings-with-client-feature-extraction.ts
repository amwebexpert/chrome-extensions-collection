import { featureExtractionEmbeddingsSearcher } from '../ia/client-vector-searcher'
import { SAMPLE_QUERIES } from './queries.utils'

const main = async () => {
  await featureExtractionEmbeddingsSearcher.init()

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

import { collectOnlineGuidelines } from './../src/background/service-worker.utils';

const main = async () => {
  const rootNode = await collectOnlineGuidelines()
  console.info('====>>> guidelines loaded from web', rootNode)

  console.info('====>>> main END.')
}

main()

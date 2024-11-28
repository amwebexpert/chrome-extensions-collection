import { main } from './embeddings-with-client-feature-extraction'

/**
 * install Vitest Runner VSCode extension to run/debug tests from within VSCode
 *   code --install-extension vitest.vitest-vscode
 *
 * run the following command to run the test at command line:
 *  npx vitest run -t "embeddings-with-client-feature-extraction"
 */

describe('embeddings-with-client-feature-extraction', () => {
  it('should find matching rules', async () => {
    await main()
  })
})

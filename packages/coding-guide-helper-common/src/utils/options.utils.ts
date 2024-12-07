import { isChromeExtension } from '@packages/chrome-common'
import type { OptionsType } from '../models/models'

const DEFAULT_MARKDOWN_FILES_URL_PREFIX =
  'https://raw.githubusercontent.com/amwebexpert/chrome-extensions-collection/master/packages/coding-guide-helper/public/markdowns'

const DEFAULT_FILES: string[] = [
  'common-coding-patterns.md',
  'common-naming-patterns.md',
  'common-react-patterns.md',
  'common-unit-testing.md',
]

const DEFAULT_OPTIONS: OptionsType = {
  files: DEFAULT_FILES.join('\n'),
  markdownFilesUrlPrefix: DEFAULT_MARKDOWN_FILES_URL_PREFIX,
}

export const getOptions = async (): Promise<OptionsType> =>
  new Promise((resolve) => {
    if (!isChromeExtension()) {
      resolve(DEFAULT_OPTIONS)
      return
    }

    chrome.storage.local.get('options', (result) => {
      const options = result.options ?? DEFAULT_OPTIONS

      const files: string = options.files ?? DEFAULT_FILES.join('\n')
      const markdownFilesUrlPrefix: string = options.markdownFilesUrlPrefix ?? DEFAULT_MARKDOWN_FILES_URL_PREFIX

      resolve({ markdownFilesUrlPrefix, files })
    })
  })

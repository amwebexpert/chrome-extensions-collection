import type { OptionsType } from '../models/models'

const DEFAULT_MARKDOWN_FILES_URL_PREFIX =
  'https://raw.githubusercontent.com/amwebexpert/chrome-extensions-collection/master/coding-guide-helper/public/markdowns'

const DEFAULT_FILES: string[] = [
  'common-coding-patterns.md',
  'common-naming-patterns.md',
  'common-react-patterns.md',
  'common-unit-testing.md',
]

export const getOptions = async (): Promise<OptionsType> =>
  new Promise((resolve) => {
    chrome.storage.local.get('options', ({ options }) => {
      const files: string = options?.files ?? DEFAULT_FILES.join('\n')
      const markdownFilesUrlPrefix: string =
        options?.markdownFilesUrlPrefix ?? DEFAULT_MARKDOWN_FILES_URL_PREFIX

      resolve({ markdownFilesUrlPrefix, files })
    })
  })

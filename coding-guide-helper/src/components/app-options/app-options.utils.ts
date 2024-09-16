import type { OptionsType } from '../../models/models'

type ValidationResults = {
  isValid: boolean
  message: string
}

const VALID = {
  isValid: true,
  message: '',
}

const buildInvalidResult = (message: string): ValidationResults => ({ isValid: false, message })

export const validateOptions = async (options: OptionsType): Promise<ValidationResults> => {
  const { markdownFilesUrlPrefix, files: filesText } = options

  if (!markdownFilesUrlPrefix.trim())
    return buildInvalidResult('Markdown files url prefix is required')

  const files = filesText
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
  if (files.length === 0) return buildInvalidResult('At least one markdown file should be provided')

  for (const file of files) {
    if (!file.toLocaleLowerCase().endsWith('.md'))
      return buildInvalidResult(
        `All files should have a markdown extension (example: path/to/my-file.md). Not a markdown file: ${file}`,
      )
  }

  const links = files.map((file) =>
    `${markdownFilesUrlPrefix.trim()}/${file}`.replace(/\/\//g, '/'),
  )
  for (const link of links) {
    if (!isValidHttpUrl(link))
      return buildInvalidResult(
        `Markdown files references should be valid http(s) url. Not a valid url: ${link}`,
      )
  }

  const results = await Promise.all(links.map(checkIfFileExists))
  const invalidResult = results.find((result) => !result.isValid)
  if (invalidResult) return invalidResult

  return VALID
}

const isValidHttpUrl = (link: string): boolean => {
  try {
    const url = new URL(link)
    return ['https:', 'http:'].includes(url.protocol)
  } catch (_) {
    return false
  }
}

const checkIfFileExists = async (link: string): Promise<ValidationResults> => {
  try {
    const response = await fetch(link)

    if (!response.ok) return buildInvalidResult(`Markdown file not found at: ${link}`)
  } catch (error) {
    return buildInvalidResult(`Error while fetching markdown file at: ${link}. Error: ${error}`)
  }

  return VALID
}

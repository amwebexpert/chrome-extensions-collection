import type { OptionsType } from '../../models/models'

type ValidationResults = {
  isValid: boolean
  messages: string[]
}

type ValidationResult = {
  isValid: boolean
  message: string
}

const VALID_RESULTS: ValidationResults = { isValid: true, messages: [] }
const VALID_RESULT: ValidationResult = { isValid: true, message: '' }

const buildInvalidResults = (message: string): ValidationResults => ({
  isValid: false,
  messages: [message],
})
const buildInvalidResult = (message: string): ValidationResult => ({ isValid: false, message })

export const validateOptions = async (options: OptionsType): Promise<ValidationResults> => {
  const { markdownFilesUrlPrefix = '', files: filesText = '' } = options

  if (!markdownFilesUrlPrefix.trim())
    return buildInvalidResults('Markdown files url prefix is required')

  const files = filesText
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
  if (files.length === 0)
    return buildInvalidResults('At least one markdown file should be provided')

  for (const file of files) {
    if (!file.toLocaleLowerCase().endsWith('.md'))
      return buildInvalidResults(
        `All files should have a markdown extension (example: path/to/my-file.md). Not a markdown file: ${file}`,
      )
  }

  const links = files.map((file) =>
    `${markdownFilesUrlPrefix.trim()}/${file}`.replace(/\/\//g, '/'),
  )
  for (const link of links) {
    if (!isValidHttpUrl(link))
      return buildInvalidResults(
        `Markdown files references should be valid http(s) url. Not a valid url: ${link}`,
      )
  }

  const results = await Promise.all(links.map(checkIfFileExists))
  const invalidResults = results.filter((result) => !result.isValid)
  if (invalidResults.length > 0)
    return buildInvalidResults(invalidResults.map((r) => r.message).join('\n'))

  return VALID_RESULTS
}

const isValidHttpUrl = (link: string): boolean => {
  try {
    const url = new URL(link)
    return ['https:', 'http:'].includes(url.protocol)
  } catch (_) {
    return false
  }
}

const checkIfFileExists = async (link: string): Promise<ValidationResult> => {
  try {
    const response = await fetch(link)
    if (!response.ok) return buildInvalidResult(`Markdown file not found at: ${link}`)
  } catch (error) {
    return buildInvalidResult(`Error while fetching markdown file at: ${link}. Error: ${error}`)
  }

  return VALID_RESULT
}

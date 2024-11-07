import type { OptionsType } from '@packages/coding-guide-helper-common'

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

  if (!markdownFilesUrlPrefix.trim()) return buildInvalidResults('Markdown files url prefix is required')

  const files = filesText
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
  if (files.length === 0) return buildInvalidResults('At least one markdown file should be provided')

  const invalidNames = files.filter((file) => !file.toLocaleLowerCase().endsWith('.md'))
  if (invalidNames.length > 0)
    return {
      isValid: false,
      messages: invalidNames.map((file) => `Invalid markdown extension: "${file}"`),
    }

  const links = files
    .map((file) => `${markdownFilesUrlPrefix.trim()}/${file}`)
    .map((link) => link.replace(/\/\//g, '/'))
  for (const link of links) {
    if (!isValidHttpUrl(link)) return buildInvalidResults(`Not a valid http resource: "${link}"`)
  }

  const results = await Promise.all(links.map(checkIfFileExists))
  const invalidResults = results.filter((result) => !result.isValid)
  if (invalidResults.length > 0) return { isValid: false, messages: invalidResults.map((r) => r.message) }

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
    if (!response.ok) return buildInvalidResult(`Can't retrieve resource: "${link}"`)
  } catch (e: unknown) {
    return buildInvalidResult(`Error while fetching resource: "${link}". Error: ${JSON.stringify(e)}`)
  }

  return VALID_RESULT
}

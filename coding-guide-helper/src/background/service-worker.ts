import { marked } from 'marked'
import { MessageType } from '../models/models'

const url =
  'https://raw.githubusercontent.com/amwebexpert/poc-archiver-bare/master/docs/coding-patterns.md'

chrome.runtime.onInstalled.addListener((detail) => {
  console.info(`service-worker ${detail.reason}`)

  fetchCodingGuidelines(url).then((markdownTokens) => {
    console.info('guidelines markdown', markdownTokens)
  })
})

chrome.runtime.onMessage.addListener((message) => {
  const { type, payload } = message
  console.info(`message received ${type}`)

  switch (type) {
    case MessageType.SET_SEARCH:
      chrome.storage.local.set({ search: payload })
      break
    case MessageType.CONTENT_SCRIPT_STARTED:
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        console.info('content script started', tabs)
      })
      break
    case MessageType.SEND_SELECTION:
      break

    default:
      console.warn('unhandled message', type)
      break
  }
})

const fetchCodingGuidelines = async (url: string) => {
  const response = await fetch(url)
  const markdown = await response.text()

  const tokens = marked.lexer(markdown)
  return tokens
}

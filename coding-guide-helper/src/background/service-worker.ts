import { marked } from 'marked'
import { Environment } from '../app.types'
import { MessageType } from '../models/models'

const url =
  'https://raw.githubusercontent.com/amwebexpert/poc-archiver-bare/master/docs/coding-patterns.md'

chrome.runtime.onInstalled.addListener(async (detail) => {
  console.info('service-worker', { detail, environment: Environment, url, guidelinesUrl: url })

  fetchCodingGuidelines(url).then((markdownTokens) => {
    console.info('guidelines markdown', markdownTokens)
  })
})

chrome.runtime.onMessage.addListener((message) => {
  console.info('service-worker message', message)
  const { action, payload } = message

  switch (action) {
    case MessageType.SET_SEARCH:
      chrome.storage.local.set({ search: payload })
      break
    case MessageType.CONTENT_SCRIPT_STARTED:
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        console.info('====>>> info', tabs)
      })
      break
    case MessageType.SEND_SELECTION:
      console.info('message', { action, payload })
      break

    default:
      console.warn('unhandled message', action)
      break
  }
})

const fetchCodingGuidelines = async (url: string) => {
  const response = await fetch(url)
  const markdown = await response.text()

  const tokens = marked.lexer(markdown)
  return tokens
}

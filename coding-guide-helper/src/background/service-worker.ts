import { marked } from 'marked'
import { Environment } from '../app.types'

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
    case 'setSearch':
      chrome.storage.local.set({ search: payload })
      break
    case 'contentScriptStarted':
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        console.info('====>>> info', tabs)
        // const tabId = Number(tabs[0].id)
        // if (tabId) chrome.pageAction.show(tabId)
      })
      break

    default:
      console.warn('service-worker message not handled', action)
      break
  }
})

const fetchCodingGuidelines = async (url: string) => {
  const response = await fetch(url)
  const markdown = await response.text()

  const tokens = marked.lexer(markdown)
  return tokens
}

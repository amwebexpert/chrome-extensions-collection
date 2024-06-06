import { Environment } from '../app.types'

chrome.runtime.onInstalled.addListener(async () => {
  console.info('====>>> onInstalled', Environment)
})

chrome.runtime.onMessage.addListener((message: {}) => {
  console.info('====>>> info', message)
})

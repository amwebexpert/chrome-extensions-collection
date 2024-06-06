import { Environment } from '../app.types'

chrome.runtime.onInstalled.addListener(async () => {
  console.info('====>>> service-worker:onInstalled', JSON.stringify(Environment, null, 2))
})

chrome.runtime.onMessage.addListener((message) => {
  console.info('====>>> info', message)
})

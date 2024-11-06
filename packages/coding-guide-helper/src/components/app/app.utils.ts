import { type Message, MessageType, getFirstActiveTab } from '@packages/coding-guide-helper-common'

export const logPlatformInfo = () =>
  chrome.runtime.getPlatformInfo().then((info) => console.log('platform info', JSON.stringify(info, null, 2)))

export const getManifestData = () => chrome.runtime.getManifest()

export const logManifestInfo = () => {
  const { version, author, name } = getManifestData()
  console.info(`chrome extension ${name} - by ${author} v.${version}`)
}

export const sendLoadStatusToContentScript = async () => {
  const tabId = await getFirstActiveTab()
  if (!tabId) return

  const message: Message = { type: MessageType.ON_CONTENT_SCRIPT_STATUS }
  return await chrome.tabs.sendMessage(tabId, message)
}

export const POPUP_PORT = chrome.runtime.connect({ name: 'popup' })

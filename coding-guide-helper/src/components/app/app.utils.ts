import { type Message, MessageType } from '../../models/models'
import { getFirstActiveTab } from '../../utils/tabs.utils'

export const logPlatformInfo = () =>
  chrome.runtime
    .getPlatformInfo()
    .then((info) => console.log('platform info', JSON.stringify(info, null, 2)))

export const logManifestInfo = () => {
  const { version, author, name } = chrome.runtime.getManifest()
  console.info(`chrome extension ${name} - by ${author} v.${version}`)
}

export const sendLoadStatusToContentScript = async () => {
  const tabId = await getFirstActiveTab()
  if (!tabId) return

  const message: Message = { type: MessageType.ON_CONTENT_SCRIPT_STATUS }
  return await chrome.tabs.sendMessage(tabId, message)
}

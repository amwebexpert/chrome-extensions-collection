import { getFirstActiveTab } from '@packages/chrome-common'
import { type Message, MessageType } from '../models/models'

export const sendLoadStatusToContentScript = async () => {
  const tabId = await getFirstActiveTab()
  if (!tabId) return

  const message: Message = { type: MessageType.ON_CONTENT_SCRIPT_STATUS }
  return await chrome.tabs.sendMessage(tabId, message)
}

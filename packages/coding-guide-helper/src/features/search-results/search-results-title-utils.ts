import { getFirstActiveTab } from '@packages/chrome-common'
import { type Message, MessageType } from '@packages/coding-guide-helper-common'

export const sendMessageToContentScript = async (info: string) => {
  const tabId = await getFirstActiveTab()
  if (!tabId) return

  const message: Message<string> = {
    type: MessageType.ON_LINK_GUIDELINES_ITEM_SELECTED,
    payload: info,
  }
  const result = await chrome.tabs.sendMessage(tabId, message)
  console.info('content script response:', result)
}

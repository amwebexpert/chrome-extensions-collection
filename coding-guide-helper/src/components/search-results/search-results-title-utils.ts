import { type Message, MessageType } from '../../models/models'

export const sendMessageToContentScript = async (info: string) => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
  const tabId = tabs[0].id
  if (!tabId) return

  const message: Message<string> = {
    type: MessageType.ON_LINK_GUIDELINES_ITEM_SELECTED,
    payload: info,
  }
  const result = await chrome.tabs.sendMessage(tabId, message)
  console.info('content script response:', result)
}

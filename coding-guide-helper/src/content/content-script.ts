import debounce from 'debounce'
import { type Message, MessageType } from '../models/models'

const onMessageReceived = (
  message: Message<unknown>,
  _sender: chrome.runtime.MessageSender,
  sendResponse: (response?: unknown) => void,
) => {
  const { type, payload } = message

  switch (type) {
    case MessageType.ON_LINK_GUIDELINES_ITEM_SELECTED: {
      sendResponse(`message ${type} handled: ${payload}`)
      break
    }

    default:
      console.warn('unhandled message', type)
      break
  }
}

const onSelectionChange = () => {
  const payload = window.getSelection()?.toString() ?? ''
  chrome.runtime.sendMessage({ type: MessageType.ON_SELECTION_CHANGE, payload })
}

const init = () => {
  chrome.runtime.sendMessage({
    type: MessageType.CONTENT_SCRIPT_STARTED,
    payload: window.location.href,
  })

  document.addEventListener('selectionchange', debounce(onSelectionChange, 600))

  chrome.runtime.onMessage.addListener(onMessageReceived)
}

init()

// const element = document.querySelector("body");
// element.style.color = "red";

import debounce from 'debounce'
import { type Message, MessageType } from '../models/models'

const loadedAt = new Date().toISOString()

type SendResponse = (response?: unknown) => void

const onMessageReceived = (
  request: Message<unknown>,
  _sender: chrome.runtime.MessageSender,
  sendResponse: SendResponse,
) => {
  const { type } = request

  switch (type) {
    case MessageType.ON_LINK_GUIDELINES_ITEM_SELECTED: {
      const message = request as Message<string>
      onLinkGuidelinesItemSelected({ message, sendResponse })
      break
    }

    case MessageType.ON_CONTENT_SCRIPT_STATUS:
      sendResponse(loadedAt)
      break

    default:
      console.warn('unhandled message', type)
      break
  }
}

type OnLinkGuidelinesItemSelected = {
  message: Message<string>
  sendResponse: SendResponse
}

const onLinkGuidelinesItemSelected = ({ message, sendResponse }: OnLinkGuidelinesItemSelected) => {
  const activeElement = document.activeElement as HTMLElement
  if (!activeElement || activeElement === document.body) return sendResponse('no active element')

  const activeElementTagName = activeElement.tagName.toLowerCase()
  activeElement.innerHTML += message.payload

  const submitButtons = document.querySelectorAll('button[type=submit]')
  for (const input of submitButtons) {
    const button = input as HTMLButtonElement
    button.disabled = false
  }

  sendResponse(`payload of ${message.type} event handled within <${activeElementTagName}> tag`)
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
  chrome.runtime.onConnect.addListener((port: chrome.runtime.Port) => {
    port.onDisconnect.addListener(() => {
      console.info('port disconnected.')
      document.removeEventListener('selectionchange', onSelectionChange)
    })
  })
}

init()

import debounce from 'debounce'
import { MessageType } from '../models/models'

const onSelectionChange = () => {
  const payload = window.getSelection()?.toString() ?? ''
  chrome.runtime.sendMessage({ type: MessageType.ON_SELECTION_CHANGE, payload })
}

const init = () => {
  document.addEventListener('selectionchange', debounce(onSelectionChange, 600))

  chrome.runtime.sendMessage({
    type: MessageType.CONTENT_SCRIPT_STARTED,
    payload: window.location.href,
  })
}

init()

// const element = document.querySelector("body");
// element.style.color = "red";

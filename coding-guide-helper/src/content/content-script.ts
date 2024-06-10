import { Environment } from '../app.types'
import { MessageType } from '../models/models'

const onStart = () => {
  const documentUrl = window.location.href
  console.info('started', { environment: Environment, documentUrl })
  chrome.runtime.sendMessage({ action: MessageType.CONTENT_SCRIPT_STARTED })
}

onStart()

// const element = document.querySelector("body");
// element.style.color = "red";

import { Environment } from '../app.types'

const onStart = () => {
  const documentUrl = window.location.href
  console.info('content-script started', { environment: Environment, documentUrl })
  console.info('content-script sending message to service-worker')
  chrome.runtime.sendMessage({ action: 'contentScriptStarted' })
}

onStart()

// const element = document.querySelector("body");
// element.style.color = "red";

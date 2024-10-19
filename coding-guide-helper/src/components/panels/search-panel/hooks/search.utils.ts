declare global {
  interface Window {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    ai?: any
  }
}

export const initGemini = async () => {
  const { version } = chrome.runtime.getManifest()
  console.info(`service-worker version: ${version}`)

  if (!window.ai?.assistant?.create) {
    console.error('cannot create assistant')
    return
  }

  const assistant = await window.ai.assistant.create()
  const response = await assistant.prompt('why is the sun hot?')
  console.info('====>>> assistant response', response)
}

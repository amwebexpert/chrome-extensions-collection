import prettyBytes from 'pretty-bytes'

export const logPlatformInfo = () =>
  chrome.runtime.getPlatformInfo().then((info) => console.log('platform info', JSON.stringify(info, null, 2)))

export const getManifestData = () => chrome.runtime.getManifest()

export const isChromeExtension = (): boolean => !!globalThis.chrome

export const getFirstActiveTab = async () => {
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true })
  return tab?.id
}

export const getCacheBytesUsed = async (): Promise<string> => {
  const bytesInUse = await chrome.storage.local.getBytesInUse()
  return prettyBytes(bytesInUse)
}

export const clearCache = async (): Promise<void> => chrome.storage.local.clear()

export const sendAsyncMessage = <M = unknown, R = unknown>(message: M, callback?: (resp: R) => void) => {
  if (message && typeof message === 'object' && 'type' in message) {
    console.info(`sendAsyncMessage ${message.type}`)
  }

  chrome.runtime.sendMessage(message, callback ?? (() => {}))
}

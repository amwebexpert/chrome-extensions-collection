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

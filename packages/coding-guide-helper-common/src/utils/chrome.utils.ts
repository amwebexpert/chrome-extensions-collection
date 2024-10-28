export const isChromeExtension = (): boolean => !!globalThis.chrome

export const getFirstActiveTab = async () => {
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true })
  return tab?.id
}

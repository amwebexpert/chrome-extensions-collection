import { getManifestData } from '@packages/coding-guide-helper-common'

export const logManifestInfo = () => {
  const { version, author, name } = getManifestData()
  console.info(`chrome extension ${name} - by ${author} v.${version}`)
}

export const POPUP_PORT = chrome.runtime.connect({ name: 'popup' })

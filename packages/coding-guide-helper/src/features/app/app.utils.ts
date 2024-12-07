import { getManifestData } from '@packages/chrome-common'

export const logManifestInfo = () => {
  const { version, author, name } = getManifestData()
  console.info(`chrome extension ${name} - by ${author} v.${version}`)
}

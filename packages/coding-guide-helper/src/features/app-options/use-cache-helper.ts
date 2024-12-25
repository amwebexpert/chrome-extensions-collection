import { clearCache, getCacheBytesUsed, sendAsyncMessage } from '@packages/chrome-common'
import { MessageType } from '@packages/coding-guide-helper-common'
import { useEffect, useState } from 'react'

const DEFAULT_CACHE_SIZE = '0 bytes'

export const useCacheHelper = () => {
  const [isClearing, setIsClearing] = useState(false)
  const [cacheSize, setCacheSize] = useState(DEFAULT_CACHE_SIZE)

  useEffect(() => {
    getCacheBytesUsed().then(setCacheSize)
  }, [])

  const clearExtensionCache = async () => {
    setIsClearing(true)

    clearCache()
      .then(() => {
        setCacheSize(DEFAULT_CACHE_SIZE)
        sendAsyncMessage({ type: MessageType.ON_RESET_CACHE })
      })
      .catch((e) => console.error('error clearing cache', e))
      .finally(() => setIsClearing(false))
  }

  return {
    cacheSize,
    clearExtensionCache,
    isClearing,
  }
}

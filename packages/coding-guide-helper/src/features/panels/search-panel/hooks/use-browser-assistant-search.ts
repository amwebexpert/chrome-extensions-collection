import { browserAssistant, isAssistantAvailableOnPlatform } from '@packages/coding-guide-helper-common'
import { useEffect } from 'react'

export const useBrowserAssistantSearch = (search = '') => {
  useEffect(() => {
    if (isAssistantAvailableOnPlatform())
      browserAssistant
        .init()
        .then(() => console.info('====>>> gemini assistant initialized'))
        .catch((error) => console.error('====>>> gemini assistant error', error))
  }, [])

  const assistantSearch = () => {
    if (isAssistantAvailableOnPlatform())
      browserAssistant
        .promptAssistant(search)
        .then((response) => console.info('====>>> gemini assistant response', response))
        .catch((error) => console.error('====>>> gemini assistant error', error))
  }

  return assistantSearch
}

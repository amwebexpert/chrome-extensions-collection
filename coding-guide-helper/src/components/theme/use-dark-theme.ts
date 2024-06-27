import { useCallback, useEffect, useState } from 'react'

const DEFAULT_VALUE = false

export const useDarkTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(DEFAULT_VALUE)

  useEffect(() => {
    chrome.storage.local.get('isDarkMode', ({ isDarkMode }) =>
      setIsDarkMode(isDarkMode ?? DEFAULT_VALUE),
    )
    chrome.storage.session.onChanged.addListener((changes) => {
      if (changes.isDarkMode) setIsDarkMode(changes.isDarkMode.newValue ?? DEFAULT_VALUE)
    })
  }, [])

  const toggleDarkMode = useCallback(() => {
    chrome.storage.local.set({ isDarkMode: !isDarkMode })
  }, [isDarkMode])

  return { isDarkMode, setIsDarkMode, toggleDarkMode }
}

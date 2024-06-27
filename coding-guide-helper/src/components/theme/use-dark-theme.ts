import { useCallback, useEffect, useState } from 'react'

export const useDarkTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    chrome.storage.local.get('isDarkMode', ({ isDarkMode }) => setIsDarkMode(isDarkMode ?? true))
    chrome.storage.session.onChanged.addListener((changes) => {
      if (changes.isDarkMode) setIsDarkMode(changes.isDarkMode.newValue)
    })
  }, [])

  const toggleDarkMode = useCallback(() => {
    chrome.storage.local.set({ isDarkMode: !isDarkMode })
  }, [isDarkMode])

  return { isDarkMode, setIsDarkMode, toggleDarkMode }
}

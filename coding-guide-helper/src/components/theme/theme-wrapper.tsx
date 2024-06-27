import { Card, ConfigProvider, theme } from 'antd'
import type { FunctionComponent, PropsWithChildren } from 'react'
import { useDarkTheme } from './use-dark-theme'

const { defaultAlgorithm, darkAlgorithm } = theme

export const ThemeWrapper: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { isDarkMode } = useDarkTheme()
  const backgroundColor = isDarkMode ? 'black' : 'white'

  return (
    <div style={{ backgroundColor, overflow: 'auto', width: 'max-content', padding: '4px' }}>
      <ConfigProvider theme={{ algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm }}>
        {children}
      </ConfigProvider>
    </div>
  )
}

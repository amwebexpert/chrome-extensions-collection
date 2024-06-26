import { Card, ConfigProvider, theme } from 'antd'
import type { FunctionComponent, PropsWithChildren } from 'react'
import { useDarkTheme } from './use-dark-theme'

const { defaultAlgorithm, darkAlgorithm } = theme

export const ThemeWrapper: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { isDarkMode } = useDarkTheme()
  console.info('====>>> info', { isDarkMode, defaultAlgorithm })

  return (
    <ConfigProvider theme={{ algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm }}>
      <Card style={{ width: 'max-content' }}>{children}</Card>
    </ConfigProvider>
  )
}

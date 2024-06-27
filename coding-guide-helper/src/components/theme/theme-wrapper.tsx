import { Card, ConfigProvider, theme } from 'antd'
import type { FunctionComponent, PropsWithChildren } from 'react'
import { useDarkTheme } from './use-dark-theme'

const { defaultAlgorithm, darkAlgorithm } = theme

export const ThemeWrapper: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { isDarkMode } = useDarkTheme()
  const backgroundColor = isDarkMode ? 'black' : 'white'

  return (
    <ConfigProvider theme={{ algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm }}>
      <div style={{ backgroundColor, overflow: 'auto' }}>
        <Card style={{ width: 'max-content' }}>{children}</Card>
      </div>
    </ConfigProvider>
  )
}

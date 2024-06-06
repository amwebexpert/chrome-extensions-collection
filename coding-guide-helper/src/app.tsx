import { Flex, Typography } from 'antd'
import { type FunctionComponent, useEffect } from 'react'
import { Environment } from './app.types'
import { Version } from './components/version'

export const App: FunctionComponent = () => {
  const { title } = Environment

  useEffect(() => {
    chrome.runtime.getPlatformInfo().then((info) => {
      console.log('platform info', JSON.stringify(info, null, 2))
    })
  }, [])

  return (
    <Flex vertical={true} style={{ minWidth: 600 }}>
      <Flex gap="middle" justify="center">
        <Typography.Text>{title}</Typography.Text>
      </Flex>

      <Version />
    </Flex>
  )
}

export default App

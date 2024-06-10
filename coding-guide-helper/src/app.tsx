import { Flex, Input, Space, Typography } from 'antd'
import { type FunctionComponent, useEffect, useState } from 'react'
import { Environment } from './app.types'
import { Version } from './components/version'
import { MessageType, PortName } from './models/models'

const { title } = Environment

const port = chrome.runtime.connect({ name: PortName.POPUP })

export const App: FunctionComponent = () => {
  const [search, setSearch] = useState('')

  useEffect(() => {
    chrome.runtime.getPlatformInfo().then((info) => {
      console.log('platform info', JSON.stringify(info, null, 2))
    })

    // restore search value
    chrome.storage.local.get('search', (data) => {
      setSearch(data.search ?? '')
    })

    port.onMessage.addListener((message, port) => {
      if (port.name !== PortName.POPUP) return

      if (message.type === MessageType.ECHO) {
        console.info('====>>> popup message echo', message)
        return
      }
    })
  }, [])

  const onSearch = () =>
    chrome.runtime.sendMessage({ type: MessageType.SET_SEARCH, payload: search })

  return (
    <Flex vertical={true} style={{ minWidth: 600, minHeight: 400 }}>
      <Flex gap="middle" vertical={true} flex={1} align="center">
        <Typography.Text>{title}</Typography.Text>

        <Space>
          <Input.Search
            placeholder="input search text"
            allowClear
            enterButton
            size="large"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onSearch={onSearch}
          />
        </Space>
      </Flex>

      <Version />
    </Flex>
  )
}

export default App

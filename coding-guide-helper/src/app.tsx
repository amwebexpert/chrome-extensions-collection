import { Collapse, Flex, Input, Space, Typography } from 'antd'
import { type FunctionComponent, useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import { Environment, type GuidelineLink } from './app.types'
import { Version } from './components/version'
import { MessageType, PortName } from './models/models'
import './app.css'

const { title } = Environment

const port = chrome.runtime.connect({ name: PortName.POPUP })

export const App: FunctionComponent = () => {
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState<GuidelineLink[]>([])

  useEffect(() => {
    chrome.runtime.getPlatformInfo().then((info) => {
      console.log('platform info', JSON.stringify(info, null, 2))
    })

    // restore search value
    chrome.storage.local.get('search', ({ search }) => {
      setSearch(search ?? '')
    })

    port.onMessage.addListener((message, port) => {
      if (port.name !== PortName.POPUP) return

      if (message.type === MessageType.ON_SEARCH_COMPLETED) {
        setSearchResults(message.payload)
        return
      }
    })
  }, [])

  const onSearch = () =>
    chrome.runtime.sendMessage({ type: MessageType.SET_SEARCH, payload: search })

  return (
    <Flex vertical={true} style={{ minWidth: 800, minHeight: 400 }}>
      <Flex gap="middle" vertical={true} flex={1} align="center">
        <Typography.Text>{title}</Typography.Text>

        <Space>
          <Input.Search
            placeholder="input search text"
            allowClear
            enterButton
            size="large"
            value={search}
            onChange={(e) => {
              console.info('====>>> info', e.target.value)
              setSearch(e.target.value)
            }}
            onSearch={onSearch}
          />
        </Space>

        <Flex className="container-full">
          <Collapse
            style={{ minWidth: '100%' }}
            items={searchResults.map(({ title, href, searchItems }) => ({
              key: title,
              label: <Typography.Text onClick={() => console.info(href)}>{title}</Typography.Text>,
              children: (
                <div className="container-full">
                  <Markdown>{searchItems.join('\n')}</Markdown>
                </div>
              ),
            }))}
          />
        </Flex>
      </Flex>

      <Version />
    </Flex>
  )
}

export default App

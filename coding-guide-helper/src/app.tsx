import { CopyOutlined } from '@ant-design/icons'
import { Collapse, Flex, Input, Space, Typography } from 'antd'
import copy from 'copy-to-clipboard'
import debounce from 'debounce'
import { type FunctionComponent, useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import './app.css'
import type { GuidelineLink } from './app.types'
import { Version } from './components/version'
import { MessageType, PortName } from './models/models'

const port = chrome.runtime.connect({ name: PortName.POPUP })

const doSearch = (payload: string) =>
  chrome.runtime.sendMessage({ type: MessageType.SET_SEARCH, payload })

const doSearchDebounced = debounce(doSearch, 500)

export const App: FunctionComponent = () => {
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState<GuidelineLink[]>([])

  useEffect(() => {
    chrome.runtime
      .getPlatformInfo()
      .then((info) => console.log('platform info', JSON.stringify(info, null, 2)))

    // restore search value
    chrome.storage.local.get('search', ({ search }) => setSearch(search ?? ''))

    // listen for worker search results and update the state
    port.onMessage.addListener((message, port) => {
      if (port.name !== PortName.POPUP) return

      if (message.type === MessageType.ON_SEARCH_COMPLETED) {
        setSearchResults(message.payload)
        return
      }
    })
  }, [])

  useEffect(() => {
    doSearchDebounced(search)
  }, [search])

  return (
    <Flex vertical={true} style={{ minWidth: 400, minHeight: 400 }}>
      <Flex gap="middle" vertical={true} flex={1} align="center">
        <Typography.Text strong={true} type="secondary">
          Coding guidelines helper
        </Typography.Text>

        <Space>
          <Input.Search
            placeholder="input search text"
            allowClear
            enterButton
            size="large"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onSearch={() => doSearch(search)}
          />
        </Space>

        <Flex className="container-full">
          <Collapse
            style={{ minWidth: '100%' }}
            items={searchResults.map(({ title, href, searchItems }) => ({
              key: title,
              label: (
                <Typography.Text>
                  {title}
                  <CopyOutlined
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      console.info('====>>> copy to clipboard')
                      copy(`Suggestion:\n- [${title}](${href})`)
                    }}
                  />
                </Typography.Text>
              ),
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

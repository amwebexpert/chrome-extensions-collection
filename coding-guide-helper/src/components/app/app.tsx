import { BookOutlined, SearchOutlined } from '@ant-design/icons'
import { Flex, Tabs, Typography } from 'antd'
import { type FunctionComponent, useEffect } from 'react'
import { SearchPanel } from '../search-panel/search-panel'
import { Version } from '../version/version'
import './app.css'
import { logPlatformInfo } from './app.utils'

const TITLE = 'Coding guidelines helper'

export const App: FunctionComponent = () => {
  useEffect(() => {
    logPlatformInfo()

    chrome.storage.local.get('allOrderedNodes', ({ allOrderedNodes }) => {
      console.info('====>>> allOrderedNodes', allOrderedNodes)
    })
  }, [])

  return (
    <Flex vertical={true} style={{ width: 700, height: 400 }}>
      <Flex gap="middle" vertical={true} flex={1} align="center">
        <Typography.Text strong={true}>{TITLE}</Typography.Text>

        <Tabs
          centered={true}
          className="tabs-container"
          defaultActiveKey="1"
          items={[
            {
              key: 'search',
              label: 'Search',
              icon: <SearchOutlined />,
              children: <SearchPanel />,
            },
            {
              key: 'guidelines',
              label: 'Guidelines',
              icon: <BookOutlined />,
              children: 'Content of Tab Pane 2',
            },
          ]}
        />
      </Flex>

      <Version />
    </Flex>
  )
}

export default App

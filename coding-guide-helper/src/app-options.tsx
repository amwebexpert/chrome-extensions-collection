import { Flex, Input, Space, Typography } from 'antd'
import { type FunctionComponent, useState } from 'react'
import { Environment } from './app.types'

const { title } = Environment

export const Options: FunctionComponent = () => {
  const [organization, setOrganization] = useState('')

  return (
    <Flex vertical={true} style={{ minWidth: 600, minHeight: 400 }}>
      <Flex gap="middle" vertical={true} flex={1} align="center">
        <Typography.Text>{title} - Options</Typography.Text>

        <Space>
          <Input
            placeholder="Organization name"
            allowClear
            size="large"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
          />
        </Space>
      </Flex>
    </Flex>
  )
}

export default Options

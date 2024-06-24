import { Flex, Typography } from 'antd'
import type { FunctionComponent } from 'react'
import { Environment } from '../../models/models'
import './version.css'

export const Version: FunctionComponent = () => {
  const { title, version } = Environment
  const information = `${title} v${version}`

  return (
    <Flex justify="right">
      <Typography.Text className="versionTypo">{information}</Typography.Text>
    </Flex>
  )
}

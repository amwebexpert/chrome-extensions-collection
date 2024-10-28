import { toHhMmSs } from '@packages/coding-guide-helper-common'
import { Flex, Typography } from 'antd'
import { type FunctionComponent, useEffect, useState } from 'react'
import { sendLoadStatusToContentScript } from '../app/app.utils'
import './version.css'
import { Environment } from '../../models/environment'

const { title, version } = Environment
const information = `${title} v${version}`

export const Version: FunctionComponent = () => {
  const [csLoadedAt, setCsLoadedAt] = useState<string>('')

  useEffect(() => {
    sendLoadStatusToContentScript().then((dateIso) => {
      const timestamp = toHhMmSs(dateIso)
      setCsLoadedAt(` (content script ${timestamp})`)
    })
  }, [])

  return (
    <Flex justify="right">
      <Typography.Text className="versionTypo">
        {information}
        {csLoadedAt}
      </Typography.Text>
    </Flex>
  )
}

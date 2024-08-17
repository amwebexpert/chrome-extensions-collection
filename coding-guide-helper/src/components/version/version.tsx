import { Flex, Typography } from 'antd'
import { type FunctionComponent, useEffect, useState } from 'react'
import { Environment } from '../../models/models'
import { toHhMmSs } from '../../utils/date-time.utils'
import { sendLoadStatusToContentScript } from '../app/app.utils'
import './version.css'

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

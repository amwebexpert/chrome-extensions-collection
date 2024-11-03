import { Table } from 'antd'
import type { FunctionComponent } from 'react'
import { ABOUT_INFOS, COLUMNS } from './about-panel.utils'

export const AboutPanel: FunctionComponent = () => (
  <Table columns={COLUMNS} dataSource={ABOUT_INFOS} pagination={false} size="small" bordered={true} />
)

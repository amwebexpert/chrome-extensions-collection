import { getManifestData } from '@packages/chrome-common'
import { Table } from 'antd'
import type { FunctionComponent } from 'react'
import { APP_VERSION_INFO } from '../../../constants'
import './about-panel.css'

type AboutInfo = {
  key: string
  label: string
  value: React.ReactNode
}

const manifestData = getManifestData()

const ABOUT_INFOS: AboutInfo[] = [
  {
    key: 'name',
    label: 'Extension Name',
    value: manifestData.name,
  },
  {
    key: 'description',
    label: 'Description',
    value: APP_VERSION_INFO.DESCRIPTION,
  },
  {
    key: 'version',
    label: 'Version',
    value: APP_VERSION_INFO.VERSION,
  },
  {
    key: 'author',
    label: 'Author',
    value: APP_VERSION_INFO.AUTHOR,
  },
  {
    key: 'buildDate',
    label: 'Last Build Date',
    value: APP_VERSION_INFO.VERSION_DATE,
  },
]

const COLUMNS = [
  {
    title: 'Info',
    dataIndex: 'label',
    key: 'label',
    width: '25%',
  },
  {
    title: 'Details',
    dataIndex: 'value',
    key: 'value',
    width: '75%',
  },
]

const iconURL =
  'https://raw.githubusercontent.com/amwebexpert/chrome-extensions-collection/master/packages/coding-guide-helper/public/icons/icon-48.png'

export const AboutPanel: FunctionComponent = () => (
  <div className="about-panel">
    <div className="about-panel-image-container">
      <img src={iconURL} alt={APP_VERSION_INFO.NAME} />
    </div>

    <Table columns={COLUMNS} dataSource={ABOUT_INFOS} pagination={false} size="small" bordered={true} />
  </div>
)

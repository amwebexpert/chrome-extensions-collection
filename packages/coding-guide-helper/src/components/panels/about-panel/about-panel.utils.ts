import { APP_VERSION_INFO } from '../../../constants'
import { getManifestData } from '../../app/app.utils'

export type AboutInfo = {
  key: string
  label: string
  value: React.ReactNode
}

const manifestData = getManifestData()

export const ABOUT_INFOS: AboutInfo[] = [
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

export const COLUMNS = [
  {
    title: 'Info',
    dataIndex: 'label',
    key: 'label',
    width: '30%',
  },
  {
    title: 'Details',
    dataIndex: 'value',
    key: 'value',
    width: '70%',
  },
]

import { DeleteOutlined, SaveOutlined } from '@ant-design/icons'
import { sendAsyncMessage } from '@packages/chrome-common'
import { MessageType, type OptionsType, getOptions } from '@packages/coding-guide-helper-common'
import type { FormProps } from 'antd'
import { Button, Flex, Form, Input, Popconfirm, Switch, Typography } from 'antd'
import { type FunctionComponent, useEffect, useState } from 'react'
import { useDarkTheme } from '../../components/theme/use-dark-theme'
import { useMessage } from '../../hooks/use-message'
import { Environment } from '../../models/environment'
import { validateOptions } from './app-options.utils'
import { useCacheHelper } from './use-cache-helper'

const { title } = Environment

export const Options: FunctionComponent = () => {
  const [form] = Form.useForm<OptionsType>()
  const { isDarkMode, toggleDarkMode } = useDarkTheme()
  const [isLoading, setIsLoading] = useState(false)

  const { contextHolder, showInfo } = useMessage()
  const { cacheSize, clearExtensionCache, isClearing } = useCacheHelper()

  useEffect(() => {
    getOptions().then(form.setFieldsValue)
  }, [form])

  const onClearCache = async () => {
    const options = form.getFieldsValue()

    const { isValid, messages } = await validateOptions(options)
    if (isValid) {
      clearExtensionCache().then(() => showInfo('Cache cleared successfully. You may have to reset the dark mode.'))
    } else {
      form.setFields([{ name: 'files', errors: messages }])
    }
  }

  const onFinish: FormProps<OptionsType>['onFinish'] = async (options) => {
    setIsLoading(true)

    try {
      const { isValid, messages } = await validateOptions(options)
      if (!isValid) {
        form.setFields([{ name: 'files', errors: messages }])
        return
      }

      sendAsyncMessage({ type: MessageType.SET_OPTIONS, payload: options })
      setTimeout(() => window.close(), 700)
    } catch (error: unknown) {
      form.setFields([{ name: 'files', errors: [JSON.stringify(error)] }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Flex vertical={true} style={{ width: '100vw', height: '100vh' }}>
      <Flex justify="center">
        <Typography.Text>{title} - Options</Typography.Text>
      </Flex>

      <Flex vertical={false} justify="center">
        <Form
          form={form}
          name="basic"
          style={{ width: '40%', marginTop: 40 }}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={{}}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<OptionsType> label="URL Prefix" name="markdownFilesUrlPrefix">
            <Input title="The url prefix for all markdown files composing the guidelines" />
          </Form.Item>

          <Form.Item<OptionsType>
            label="Files"
            name="files"
            rules={[{ required: true, message: 'Please input the markdown filenames' }]}
          >
            <Input.TextArea rows={5} />
          </Form.Item>

          <Form.Item label="Dark mode">
            <Switch value={isDarkMode} onChange={toggleDarkMode} />
          </Form.Item>

          <Form.Item label={`Extension cache (${cacheSize})`}>
            <Popconfirm
              title="Clear cache confirmation"
              description="Are you sure to clear the extension cache?"
              onConfirm={onClearCache}
            >
              <Button type="primary" htmlType="button" loading={isClearing} icon={<DeleteOutlined />}>
                Clear cache and reload guidelines
              </Button>
            </Popconfirm>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
            <Button type="primary" htmlType="submit" loading={isLoading} icon={<SaveOutlined />}>
              Save and close
            </Button>
          </Form.Item>
        </Form>
      </Flex>

      {contextHolder}
    </Flex>
  )
}

export default Options

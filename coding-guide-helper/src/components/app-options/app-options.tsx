import type { FormProps } from 'antd'
import { Button, Flex, Form, Input, Typography } from 'antd'
import { type FunctionComponent, useEffect } from 'react'
import { Environment, MessageType } from '../../models/models'

type OptionsType = {
  organizationName?: string
  repoName?: string
  files?: string
}

const { title } = Environment

export const Options: FunctionComponent = () => {
  const [form] = Form.useForm()

  useEffect(() => {
    chrome.storage.local.get('options', ({ options }) => form.setFieldsValue(options ?? {}))
  }, [form])

  const onFinish: FormProps<OptionsType>['onFinish'] = (options: OptionsType) =>
    chrome.runtime.sendMessage({ type: MessageType.SET_OPTIONS, payload: options })

  return (
    <Flex vertical={true} style={{ width: '100%' }}>
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
          <Form.Item<OptionsType>
            label="Organization"
            name="organizationName"
            rules={[{ required: true, message: 'Please input the organization name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<OptionsType>
            label="Repository"
            name="repoName"
            rules={[{ required: true, message: 'Please input the repo name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<OptionsType>
            label="Files"
            name="files"
            rules={[{ required: true, message: 'Please input the markdown files' }]}
          >
            <Input.TextArea rows={5} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Flex>
  )
}

export default Options

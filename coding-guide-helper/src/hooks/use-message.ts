import { message } from 'antd'

const style = { marginTop: 80 }
const duration = 1.5

export const useMessage = () => {
  const [messageApi, contextHolder] = message.useMessage()

  const showSuccess = (content: string) =>
    messageApi.open({ type: 'success', content, style, duration })

  const showError = (content: string) =>
    messageApi.open({ type: 'error', content, style, duration })

  const showInfo = (content: string) => messageApi.open({ type: 'info', content, style, duration })

  const showWarning = (content: string) =>
    messageApi.open({ type: 'warning', content, style, duration })

  return { showSuccess, showError, showInfo, showWarning, contextHolder }
}

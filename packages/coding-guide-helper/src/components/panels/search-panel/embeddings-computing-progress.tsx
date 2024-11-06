import type { ComputeEmbeddingsStats } from '@packages/coding-guide-helper-common'
import { Flex, Progress, Space } from 'antd'
import type { FunctionComponent } from 'react'

export const EmbeddingsComputingProgress: FunctionComponent<{
  stats: ComputeEmbeddingsStats
}> = ({ stats }) => {
  const hasTotal = stats.total > 0
  const percent = hasTotal ? Math.ceil((stats.completed / stats.total) * 100) : 0

  return (
    <Flex gap="middle" vertical={true} flex={1} align="center">
      <p>Computing styleguide semantic infos for the very first time...</p>
      <Progress type="circle" size={80} percent={percent} />
    </Flex>
  )
}

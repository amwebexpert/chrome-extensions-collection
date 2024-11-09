import type { InputRef } from 'antd'
import { useEffect, useRef } from 'react'

type UseSetFocusArgs = {
  delay: number
}

export const useSetFocus = ({ delay }: UseSetFocusArgs) => {
  const inputRef = useRef<InputRef>(null)

  useEffect(() => {
    setTimeout(() => inputRef.current?.select(), delay)
  }, [delay])

  return inputRef
}

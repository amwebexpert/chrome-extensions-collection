import matchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'
import { afterEach, expect, vi } from 'vitest'

expect.extend(matchers ?? {})

afterEach(() => {
  vi.resetAllMocks()
  cleanup()
})

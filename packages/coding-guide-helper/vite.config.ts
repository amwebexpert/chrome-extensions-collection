import { crx } from '@crxjs/vite-plugin'
import react from '@vitejs/plugin-react'
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import version from 'vite-plugin-package-version'
import { manifest } from './manifest'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), version(), crx({ manifest })],
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173,
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
  },
})

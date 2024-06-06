/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import version from "vite-plugin-package-version";
import { manifest } from './manifest'

const viteManifestHackIssue846 = {
  // Workaround from https://github.com/crxjs/chrome-extension-tools/issues/846#issuecomment-1861880919.
  name: 'manifestHackIssue846',
  renderCrxManifest(_manifest, bundle) {
      bundle['manifest.json'] = bundle['.vite/manifest.json']
      bundle['manifest.json'].fileName = 'manifest.json'
      delete bundle['.vite/manifest.json']
  },
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), version(), viteManifestHackIssue846, crx({ manifest })],
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

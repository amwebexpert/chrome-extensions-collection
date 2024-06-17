import type { ManifestV3Export } from '@crxjs/vite-plugin'

export const manifest: ManifestV3Export = {
  manifest_version: 3,
  name: 'coding-guide-helper',
  version: process.env.npm_package_version,
  description:
    'Coding guide helper is a chrome extension to help doing pull requests review process.',
  action: {
    default_popup: 'index.html',
  },
  options_page: 'index-options.html',
  icons: {
    16: 'icons/icon-16.png',
    32: 'icons/icon-32.png',
    48: 'icons/icon-48.png',
    128: 'icons/icon-128.png',
  },
  background: {
    service_worker: 'src/background/service-worker.ts',
    type: 'module',
  },
  web_accessible_resources: [
    {
      resources: ['public/*.jpg', 'public/*.md'],
      matches: ['*://*/*'],
    },
  ],
  permissions: [
    'activeTab',
    'declarativeNetRequest',
    // This permission is need for redirecting
    'declarativeNetRequestWithHostAccess',
    'tabs',
    'contextMenus',
    'unlimitedStorage',
    'storage',
  ],
  content_scripts: [
    {
      js: ['src/content/content-script.ts'],
      matches: ['https://*/*', 'http://*/*'],
    },
  ],
  // Host permissions for all urls is needed because websites to block are determined by users.
  // Thus extension does not know which urls to block in advance
  host_permissions: ['<all_urls>'],
  commands: {
    _execute_action: {
      suggested_key: {
        default: 'Ctrl+Shift+Y',
        mac: 'Command+Shift+Y',
      },
      description: 'Toggle Coding Guide Helper',
    },
  },
}

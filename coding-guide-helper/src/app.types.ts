export const Environment = Object.freeze({
  title: import.meta.env.VITE_TITLE, // https://vitejs.dev/guide/env-and-mode#env-files
  version: import.meta.env.PACKAGE_VERSION, // https://www.npmjs.com/package/vite-plugin-package-version
})

export type GuidelineLink = {
  title: string
  href: string
  searchItems: string[]
}

export const Environment = Object.freeze({
  title: import.meta.env.VITE_TITLE, // https://vitejs.dev/guide/env-and-mode#env-files
  version: import.meta.env.PACKAGE_VERSION, // https://www.npmjs.com/package/vite-plugin-package-version
})

export type GuidelineNode = {
  level: number
  title: string
  titleMarkdown: string
  href: string
  markdownLines: string[]
  children: GuidelineNode[]

  parent?: GuidelineNode
  isMatching?: boolean
}

export enum MessageType {
  CONTENT_SCRIPT_STARTED = 'contentScriptStarted',
  SET_SEARCH = 'setSearch',
  SET_OPTIONS = 'setOptions',
  ON_SELECTION_CHANGE = 'onSelectionChange',
  ON_SEARCH_COMPLETED = 'onSearchCompleted',
}

export enum MenuItems {
  SEND_SELECTION = 'sendSelection',
}

export enum PortName {
  POPUP = 'popup',
}

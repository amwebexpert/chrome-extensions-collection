export const Environment = Object.freeze({
  title: import.meta.env.VITE_TITLE, // https://vitejs.dev/guide/env-and-mode#env-files
  version: import.meta.env.PACKAGE_VERSION, // https://www.npmjs.com/package/vite-plugin-package-version
})

export type OptionsType = {
  markdownFilesUrlPrefix: string
  files: string
}

export type GuidelineNode = {
  level: number
  title: string
  titleMarkdown: string
  href: string
  markdownLines: string[]
  children: GuidelineNode[]

  parent?: GuidelineNode
  isMatching?: boolean
  shouldDisplayNode?: boolean
}

export enum MessageType {
  // from content script
  CONTENT_SCRIPT_STARTED = 'contentScriptStarted',
  ON_SELECTION_CHANGE = 'onSelectionChange',

  // from popup(s)
  ON_POPUP_OPEN = 'onPopupOpen',
  SET_SEARCH = 'setSearch',
  SET_OPTIONS = 'setOptions',
  ON_LINK_GUIDELINES_ITEM_SELECTED = 'onLinkGuidelinesItemSelected',

  // from background
  ON_SEARCH_LOADING = 'onSearchLoading',
  ON_SEARCH_COMPLETED = 'onSearchCompleted',
  ON_SEARCH_ERROR = 'onSearchError',
}

export type Message<PayloadType = string> = {
  type: MessageType
  payload: PayloadType
}

export enum MenuItems {
  SEND_SELECTION = 'sendSelection',
}

export enum PortName {
  POPUP = 'popup',
}

export type TocLink = {
  title: string
  href: string
}

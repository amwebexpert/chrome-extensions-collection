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
  ON_CONTENT_SCRIPT_STATUS = 'onContentScriptStatus',
  ON_RESET_CACHE = 'onResetCache',

  CREATE_NEXT_EMBEDDINGS = 'createNextEmbeddings',

  // from background
  ON_SEARCH_LOADING = 'onSearchLoading',
  ON_SEARCH_COMPLETED = 'onSearchCompleted',
  ON_SEARCH_ERROR = 'onSearchError',

  ON_EMBEDDINGS_CREATED = 'onEmbeddingsCreated',
}

export type Message<PayloadType = void> = PayloadType extends void
  ? { type: MessageType }
  : { type: MessageType; payload: PayloadType }

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

export type ComputedEmbeddingsStats = {
  isCompleted: boolean
  total: number
  completed: number
  nextRuleTitle: string
}

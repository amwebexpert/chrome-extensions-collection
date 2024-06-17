export enum MessageType {
  CONTENT_SCRIPT_STARTED = 'contentScriptStarted',
  SET_SEARCH = 'setSearch',
  SET_OPTIONS = 'setOptions',
  ON_SELECTION_CHANGE = 'onSelectionChange',
  ECHO = 'echo',
}

export enum MenuItems {
  SEND_SELECTION = 'sendSelection',
}

export enum PortName {
  POPUP = 'popup',
}

import debounce from 'debounce'
import { MessageType } from '../../models/models'

export const doSearch = (payload: string) =>
  chrome.runtime.sendMessage({ type: MessageType.SET_SEARCH, payload })

export const doSearchDebounced = debounce(doSearch, 500)

export const logPlatformInfo = () =>
  chrome.runtime
    .getPlatformInfo()
    .then((info) => console.log('platform info', JSON.stringify(info, null, 2)))

export const logPlatformInfo = () =>
  chrome.runtime
    .getPlatformInfo()
    .then((info) => console.log('platform info', JSON.stringify(info, null, 2)))

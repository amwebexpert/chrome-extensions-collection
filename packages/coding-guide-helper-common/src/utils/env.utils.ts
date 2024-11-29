export const setLocalDevMode = (): void => {
  process.env.localDevMode = 'true'
}

export const isLocalDevMode = (): boolean => process?.env?.localDevMode === 'true'

import React from 'react'
import ReactDOM from 'react-dom/client'
import Options from './components/app-options/app-options'
import { ThemeWrapper } from './components/theme/theme-wrapper'
import { getDocumentRoot } from './main.utils'

export const main = () => {
  ReactDOM.createRoot(getDocumentRoot()).render(
    <React.StrictMode>
      <ThemeWrapper>
        <Options />
      </ThemeWrapper>
    </React.StrictMode>,
  )
}

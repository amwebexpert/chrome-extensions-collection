import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeWrapper } from './components/theme/theme-wrapper'
import Options from './features/app-options/app-options'
import { getDocumentRoot } from './main.utils'

ReactDOM.createRoot(getDocumentRoot()).render(
  <React.StrictMode>
    <ThemeWrapper>
      <Options />
    </ThemeWrapper>
  </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/app/app'
import { ThemeWrapper } from './components/theme/theme-wrapper'
import { getDocumentRoot } from './main.utils'

ReactDOM.createRoot(getDocumentRoot()).render(
  <React.StrictMode>
    <ThemeWrapper>
      <App />
    </ThemeWrapper>
  </React.StrictMode>,
)

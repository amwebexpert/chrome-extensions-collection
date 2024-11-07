import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeWrapper } from './components/theme/theme-wrapper'
import App from './features/app/app'
import { getDocumentRoot } from './main.utils'

ReactDOM.createRoot(getDocumentRoot()).render(
  <React.StrictMode>
    <ThemeWrapper>
      <App />
    </ThemeWrapper>
  </React.StrictMode>,
)

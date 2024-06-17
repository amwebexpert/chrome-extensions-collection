import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'
import App from './app'
import Options from './app-options'

export enum Page {
  App = 'app',
  Options = 'options',
}

export const main = (page: Page = Page.App) => {
  const root = document.getElementById('root')

  if (!root) {
    console.error('====>>> "root" element not found in the document.', document.location.href)
    return
  }

  ReactDOM.createRoot(root).render(
    <React.StrictMode>{page === Page.App ? <App /> : <Options />}</React.StrictMode>,
  )
}

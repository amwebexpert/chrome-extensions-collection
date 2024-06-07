import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import './main.css'

const main = () => {
  const root = document.getElementById('root')

  if (!root) {
    console.error('====>>> "root" element not found in the document.', document.location.href)
    return
  }

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}

main()

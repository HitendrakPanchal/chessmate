import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import './index.css'

import './assets/styles/tailwind.css'

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
}
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import '@fontsource/bebas-neue/latin.css'
import '@fontsource-variable/archivo/wdth.css'
import 'swiper/css'
import './styles/base.css'
import './styles/sections.css'
import './styles/pages.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </HashRouter>
  </React.StrictMode>
)

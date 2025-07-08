import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App3d from './threefibercanvas.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App3d></App3d>
  </StrictMode>,
)

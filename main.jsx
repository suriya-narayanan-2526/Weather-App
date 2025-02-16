import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Weather.css'
import { Weather } from './weather'
// import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Weather/>
  </StrictMode>,
)

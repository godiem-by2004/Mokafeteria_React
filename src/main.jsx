import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './index.css' // siempre DESPUÉS de Bootstrap para poder sobrescribirlo
import { CarritoProvider } from './context/CarritoContext'
import { UsuarioProvider } from './context/UsuarioContext'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UsuarioProvider>
        <CarritoProvider>
          <App />
        </CarritoProvider>
      </UsuarioProvider>
    </BrowserRouter>
  </StrictMode>,
)

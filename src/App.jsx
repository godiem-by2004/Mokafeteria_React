import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Inicio from './pages/Inicio'
import Productos from './pages/Productos'
import DetalleProducto from './pages/DetalleProducto'
import Carrito from './pages/Carrito'
import CompraExitosa from './pages/CompraExitosa'
import Acceso from './pages/Acceso'
import SobreNosotros from './pages/SobreNosotros'
import Reserva from './pages/Reserva'
import Contacto from './pages/Contacto'
import NoEncontrada from './pages/NoEncontrada'

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/:id" element={<DetalleProducto />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/compra-exitosa" element={<CompraExitosa />} />
          <Route path="/acceso" element={<Acceso />} />
          <Route path="/sobre-nosotros" element={<SobreNosotros />} />
          <Route path="/reserva" element={<Reserva />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App

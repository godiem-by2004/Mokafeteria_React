import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import BsNavbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Badge from 'react-bootstrap/Badge'
import { useCarrito } from '../context/CarritoContext'
import { useUsuario } from '../context/UsuarioContext'

const enlaces = [
  { to: '/', texto: 'Inicio' },
  { to: '/productos', texto: 'Productos' },
  { to: '/sobre-nosotros', texto: 'Sobre nosotros' },
  { to: '/reserva', texto: 'Reserva de mesa' },
  { to: '/contacto', texto: 'Contacto' },
]

function Navbar() {
  const navigate = useNavigate()
  const [abierto, setAbierto] = useState(false) 
  const { cantidadTotal } = useCarrito()
  const { usuario, cerrarSesion } = useUsuario() 

  const cerrarMenu = () => setAbierto(false)
  const primerNombre = usuario ? usuario.nombre.split(' ')[0] : ''

  function salir() {
    cerrarSesion()
    cerrarMenu()
    navigate('/')
  }

  return (
    <BsNavbar expand="lg" expanded={abierto} onToggle={setAbierto} className="brand-navbar sticky-top">
      <Container>
        <BsNavbar.Brand as={Link} to="/" onClick={cerrarMenu} className="d-flex align-items-center">
          <i className="bi bi-cup-hot-fill me-2 fs-3 text-coffee"></i>
          <span>Mokafetería</span>
        </BsNavbar.Brand>

        <div className="d-flex align-items-center gap-2 ms-auto me-2 ms-lg-2 me-lg-0 order-lg-last">
          <NavLink
            to="/acceso"
            onClick={cerrarMenu}
            aria-label={usuario ? `Mi cuenta: ${usuario.nombre}` : 'Acceso'}
            className="btn-acceso d-inline-flex align-items-center text-decoration-none"
          >
            <i className={`bi ${usuario ? 'bi-person-check-fill' : 'bi-person-circle'} me-sm-1`}></i>
            <span className="d-none d-sm-inline">{usuario ? primerNombre : 'Acceso'}</span>
          </NavLink>

          {usuario && (
            <button type="button" className="btn-salir" onClick={salir} aria-label="Cerrar sesión" title="Cerrar sesión">
              <i className="bi bi-box-arrow-right"></i>
            </button>
          )}

          <Link
            to="/carrito"
            onClick={cerrarMenu}
            aria-label={`Carrito, ${cantidadTotal} productos`}
            className="btn-cart position-relative d-inline-flex align-items-center text-decoration-none"
          >
            <i className="bi bi-cart3 me-sm-1"></i>
            <span className="d-none d-sm-inline">Carrito</span>
            {cantidadTotal > 0 && (
              <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
                {cantidadTotal}
              </Badge>
            )}
          </Link>
        </div>

        <BsNavbar.Toggle aria-controls="menu-principal" />

        <BsNavbar.Collapse id="menu-principal">
          <Nav className="ms-auto align-items-lg-center gap-lg-2">
            {enlaces.map(({ to, texto }) => (
              <Nav.Link key={to} as={NavLink} to={to} end={to === '/'} onClick={cerrarMenu}>
                {texto}
              </Nav.Link>
            ))}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  )
}

export default Navbar

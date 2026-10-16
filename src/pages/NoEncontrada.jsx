import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import useTitulo from '../hooks/useTitulo'

function NoEncontrada() {
  useTitulo('Página no encontrada')

  return (
    <Container className="py-5 text-center">
      <h1 className="fw-bold display-5 brand-title">Página no encontrada</h1>
      <p className="lead bajada">La dirección que buscas no existe.</p>
      <Link to="/" className="btn btn-moka">
        Volver al inicio
      </Link>
    </Container>
  )
}

export default NoEncontrada

import { Link, useLocation } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import { formatearPrecio } from '../utils/formato'
import useTitulo from '../hooks/useTitulo'

function CompraExitosa() {
  useTitulo('Pedido confirmado')
  const { state } = useLocation()

  return (
    <Container className="py-5 text-center">
      <div className="bg-white rounded-4 shadow-sm p-5 mx-auto" style={{ maxWidth: 560 }}>
        <i className="bi bi-check-circle-fill fs-1 text-success"></i>
        <h1 className="h2 fw-bold mt-3">¡Gracias por tu pedido!</h1>
        <p className="text-muted">Lo estamos preparando en Mokafetería.</p>
        {state?.totalPagado != null && (
          <p className="fw-semibold">Total del pedido: {formatearPrecio(state.totalPagado)}</p>
        )}
        <Link to="/productos" className="btn btn-moka mt-2">
          Seguir comprando
        </Link>
      </div>
    </Container>
  )
}

export default CompraExitosa

import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import { useCarrito } from '../context/CarritoContext'
import { categorias } from '../data/categorias'
import { obtenerProductoPorId } from '../services/api'
import { formatearPrecio } from '../utils/formato'
import useTitulo from '../hooks/useTitulo'

function DetalleProducto() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { key } = useLocation()
  const { items, agregarAlCarrito } = useCarrito()
  const [producto, setProducto] = useState(null)
  const [error, setError] = useState(null)

  useTitulo(producto ? producto.nombre : 'Producto')

  useEffect(() => {
    let ignorar = false
    setProducto(null)
    setError(null)

    obtenerProductoPorId(id)
      .then((datos) => !ignorar && setProducto(datos))
      .catch((err) => !ignorar && setError(err.message))

    return () => {
      ignorar = true
    }
  }, [id])

  function volver() {
    navigate(key === 'default' ? '/productos' : -1)
  }

  const stockMaximo = producto?.stock ?? 0
  const sinStock = stockMaximo <= 0
  const enCarrito = items.find((item) => item.producto.id === producto?.id)?.cantidad ?? 0
  const limiteAlcanzado = !sinStock && enCarrito >= stockMaximo
  const noPermiteAgregar = sinStock || limiteAlcanzado

  function agregarYIrAlCarrito() {
    if (noPermiteAgregar) return
    agregarAlCarrito(producto)
    navigate('/carrito')
  }

  if (error) {
    return (
      <Container className="py-5" style={{ maxWidth: 560 }}>
        <Alert variant="danger">{error}</Alert>
        <button type="button" className="btn btn-moka" onClick={() => navigate('/productos')}>
          Volver al catálogo
        </button>
      </Container>
    )
  }

  if (!producto) {
    return <p className="text-center text-moka fw-semibold py-5">Cargando producto...</p>
  }

  const nombreCategoria = categorias.find((c) => c.id === producto.categoria)?.nombre ?? producto.categoria

  return (
    <Container className="py-5">
      <Row className="g-4 align-items-center justify-content-center">
        <Col md={6} lg={5}>
          <img src={producto.imagen} alt={producto.nombre} className="detalle-imagen w-100 rounded-4 shadow-sm" />
        </Col>

        <Col md={6} lg={5}>
          <div className="bg-white rounded-4 shadow-sm p-4">
            <span className="badge bg-moka mb-2">{nombreCategoria}</span>
            <h1 className="h2 fw-bold">{producto.nombre}</h1>
            <p className="text-muted">{producto.descripcion}</p>

            <div className="d-flex align-items-center gap-3 mb-3">
              <span className="badge-price fs-5">{formatearPrecio(producto.precio)}</span>
              {sinStock && <span className="badge bg-danger px-3 py-2 fs-6">Agotado</span>}
              {limiteAlcanzado && <span className="badge bg-secondary px-3 py-2 fs-6">Límite alcanzado</span>}
            </div>

            {enCarrito > 0 && (
              <p className="small text-moka fw-semibold">
                <i className="bi bi-cart-check me-1"></i>
                Ya tienes {enCarrito} en tu carrito. {limiteAlcanzado && '(No puedes agregar más unidades)'}
              </p>
            )}

            <div className="d-flex flex-wrap gap-2 mt-4">
              <button type="button" className="btn btn-outline-secondary" onClick={volver}>
                Volver
              </button>

              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={() => agregarAlCarrito(producto)}
                disabled={noPermiteAgregar}
              >
                {sinStock ? 'Agotado' : limiteAlcanzado ? 'Límite alcanzado' : 'Agregar al carrito'}
              </button>

              <button
                type="button"
                className="btn btn-moka"
                onClick={agregarYIrAlCarrito}
                disabled={noPermiteAgregar}
              >
                {sinStock ? 'Sin stock' : limiteAlcanzado ? 'Límite alcanzado' : 'Agregar y ver carrito'}
              </button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default DetalleProducto

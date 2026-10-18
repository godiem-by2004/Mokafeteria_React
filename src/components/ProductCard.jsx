import { useNavigate } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import { useCarrito } from '../context/CarritoContext'
import { formatearPrecio } from '../utils/formato'

function ProductCard({ producto, onAgregar }) {
  const navigate = useNavigate()
  const { items } = useCarrito()
  const { id, nombre, descripcion, precio, imagen, stock = 0 } = producto

  const sinStock = stock <= 0
  const enCarrito = items.find((item) => item.producto.id === id)?.cantidad ?? 0
  const limiteAlcanzado = !sinStock && enCarrito >= stock
  const noPermiteAgregar = sinStock || limiteAlcanzado

  return (
    <Card className="card-product h-100 shadow-sm">
      <Card.Img variant="top" src={imagen} alt={nombre} />
      <Card.Body className="d-flex flex-column">
        <Card.Title as="h6" className="fw-bold mb-1">
          {nombre}
        </Card.Title>
        <Card.Text className="text-muted small flex-grow-1">{descripcion}</Card.Text>

        <div className="mb-2" style={{ minHeight: '1.25rem' }}>
          {sinStock && <span className="text-danger fw-semibold small">Agotado</span>}
          {limiteAlcanzado && <span className="text-danger fw-semibold small">Límite alcanzado</span>}
        </div>

        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mt-auto">
          <span className="badge-price">{formatearPrecio(precio)}</span>
          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className="btn btn-sm btn-outline-dark"
              onClick={() => navigate(`/productos/${id}`)}
              aria-label={`Ver detalle de ${nombre}`}
            >
              Ver detalle
            </button>

            <button
              type="button"
              className="btn btn-add-cart"
              onClick={() => onAgregar(producto)}
              disabled={noPermiteAgregar}
              title={
                sinStock
                  ? 'Producto agotado'
                  : limiteAlcanzado
                  ? 'Has alcanzado el límite de unidades disponibles'
                  : 'Añadir al carrito'
              }
              aria-label={`Añadir ${nombre} al carrito`}
            >
              <i className="bi bi-plus-lg"></i>
            </button>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

export default ProductCard

import { useNavigate } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import { formatearPrecio } from '../utils/formato'

function ProductCard({ producto, onAgregar }) {
  const navigate = useNavigate()
  const { id, nombre, descripcion, precio, imagen } = producto

  return (
    <Card className="card-product h-100 shadow-sm">
      <Card.Img variant="top" src={imagen} alt={nombre} />
      <Card.Body className="d-flex flex-column">
        <Card.Title as="h6" className="fw-bold mb-1">
          {nombre}
        </Card.Title>
        <Card.Text className="text-muted small flex-grow-1">{descripcion}</Card.Text>
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mt-3">
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
              title="Añadir al carrito"
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

import { formatearPrecio } from '../utils/formato'

function ItemCarrito({ item, onSumar, onRestar, onQuitar }) {
  const { producto, cantidad } = item

  return (
    <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3 pb-3 border-bottom">
      <div>
        <h6 className="mb-0 fw-bold">{producto.nombre}</h6>
        <small className="text-muted">{formatearPrecio(producto.precio)} c/u</small>
      </div>
      <div className="d-flex align-items-center gap-2">
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary px-2"
          onClick={() => onRestar(producto.id)}
          aria-label={`Quitar una unidad de ${producto.nombre}`}
        >
          -
        </button>
        <span className="fw-bold">{cantidad}</span>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary px-2"
          onClick={() => onSumar(producto)}
          aria-label={`Agregar una unidad de ${producto.nombre}`}
        >
          +
        </button>
        <span className="ms-2 fw-bold">{formatearPrecio(producto.precio * cantidad)}</span>
        <button
          type="button"
          className="btn btn-sm text-danger"
          onClick={() => onQuitar(producto.id)}
          aria-label={`Eliminar ${producto.nombre} del carrito`}
        >
          <i className="bi bi-trash"></i>
        </button>
      </div>
    </div>
  )
}

export default ItemCarrito

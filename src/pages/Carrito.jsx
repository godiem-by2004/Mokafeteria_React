import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import EncabezadoMarca from '../components/EncabezadoMarca'
import ItemCarrito from '../components/ItemCarrito'
import { useCarrito } from '../context/CarritoContext'
import { formatearPrecio } from '../utils/formato'
import useTitulo from '../hooks/useTitulo'

function Carrito() {
  useTitulo('Carrito')
  const navigate = useNavigate()
  const { items, agregarAlCarrito, disminuirCantidad, quitarDelCarrito, vaciarCarrito, total } = useCarrito()

  function confirmarPedido() {
    const totalPagado = total
    vaciarCarrito()
    navigate('/compra-exitosa', { state: { totalPagado } })
  }

  return (
    <>
      <EncabezadoMarca titulo="Tu pedido" />

      <Container className="pb-5">
        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="bg-white rounded-4 shadow-sm p-4">
              {items.length === 0 ? (
                <div className="text-center py-4">
                  <i className="bi bi-bag fs-1 text-caramel"></i>
                  <p className="text-muted my-3">Tu carrito está vacío</p>
                  <button type="button" className="btn btn-moka" onClick={() => navigate('/productos')}>
                    Ver productos
                  </button>
                </div>
              ) : (
                <>
                  {items.map((item) => (
                    <ItemCarrito
                      key={item.producto.id}
                      item={item}
                      onSumar={agregarAlCarrito}
                      onRestar={disminuirCantidad}
                      onQuitar={quitarDelCarrito}
                    />
                  ))}

                  <div className="d-flex justify-content-between align-items-center fw-bold fs-5 mb-4">
                    <span>Total:</span>
                    <span>{formatearPrecio(total)}</span>
                  </div>

                  <div className="d-flex flex-wrap justify-content-between gap-2">
                    <button type="button" className="btn btn-outline-secondary" onClick={vaciarCarrito}>
                      Vaciar carrito
                    </button>
                    <div className="d-flex flex-wrap gap-2">
                      <button type="button" className="btn btn-outline-dark" onClick={() => navigate('/productos')}>
                        Seguir comprando
                      </button>
                      <button type="button" className="btn btn-primary-custom" onClick={confirmarPedido}>
                        Confirmar pedido
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Carrito

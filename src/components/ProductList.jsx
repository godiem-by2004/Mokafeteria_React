import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ProductCard from './ProductCard'

function ProductList({ productos, onAgregar }) {
  if (productos.length === 0) {
    return (
      <div className="text-center py-5">
        <h4 className="text-white">No se encontraron productos</h4>
        <p className="text-moka">Prueba buscando con otro término o categoría.</p>
      </div>
    )
  }

  return (
    <Row xs={1} sm={2} md={3} lg={4} className="g-4">
      {productos.map((producto) => (
        // key: identificador ÚNICO y ESTABLE para cada tarjeta.
        <Col key={producto.id}>
          <ProductCard producto={producto} onAgregar={onAgregar} />
        </Col>
      ))}
    </Row>
  )
}

export default ProductList

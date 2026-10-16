import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Alert from 'react-bootstrap/Alert'
import BarraCategorias from '../components/BarraCategorias'
import EncabezadoMarca from '../components/EncabezadoMarca'
import ProductList from '../components/ProductList'
import { useCarrito } from '../context/CarritoContext'
import { categorias } from '../data/categorias'
import { obtenerProductos } from '../services/api'
import useTitulo from '../hooks/useTitulo'

function Productos() {
  useTitulo('Productos')
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('todos')
  const { agregarAlCarrito } = useCarrito()

  
  useEffect(() => {
    let ignorar = false

    obtenerProductos()
      .then((datos) => {
        if (!ignorar) setProductos(datos)
      })
      .catch((err) => {
        if (!ignorar) setError(err.message)
      })
      .finally(() => {
        if (!ignorar) setCargando(false)
      })

    return () => {
      ignorar = true
    }
  }, [])

  const termino = busqueda.toLowerCase().trim()
  const productosFiltrados = productos.filter(
    (p) =>
      (categoria === 'todos' || p.categoria === categoria) &&
      (p.nombre.toLowerCase().includes(termino) || p.descripcion.toLowerCase().includes(termino)),
  )

  return (
    <>
      <EncabezadoMarca titulo="Nuestros productos" bajada="Café de especialidad, repostería y mucho más." />

      <Container className="pb-4">
        <InputGroup className="mx-auto" style={{ maxWidth: 480 }}>
          <InputGroup.Text className="search-icon">
            <i className="bi bi-search"></i>
          </InputGroup.Text>
          <Form.Control
            type="search"
            className="search-input"
            placeholder="Buscar en Mokafetería..."
            aria-label="Buscar productos"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </InputGroup>
      </Container>

      <BarraCategorias categorias={categorias} activa={categoria} onSeleccionar={setCategoria} />

      <Container className="my-4 pb-4">
        {cargando && <p className="text-center text-moka fw-semibold py-5">Cargando productos...</p>}
        {error && <Alert variant="danger">Error: {error}</Alert>}
        {!cargando && !error && (
          <>
            <p className="text-moka small">
              Mostrando {productosFiltrados.length} de {productos.length} productos
            </p>
            <ProductList productos={productosFiltrados} onAgregar={agregarAlCarrito} />
          </>
        )}
      </Container>
    </>
  )
}

export default Productos

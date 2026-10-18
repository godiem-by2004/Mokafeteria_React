import Container from 'react-bootstrap/Container'

// Título de página reutilizable: recibe el texto por props.
function EncabezadoMarca({ titulo, bajada }) {
  return (
    <Container className="text-center pt-5 pb-3">
      <h1 className="fw-bold display-5 brand-title">{titulo}</h1>
      {bajada && <p className="lead bajada">{bajada}</p>}
    </Container>
  )
}

export default EncabezadoMarca

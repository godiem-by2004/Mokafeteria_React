import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function UbicacionHorario() {
  return (
    <section className="seccion-ubicacion text-center py-4">
      <Container>
        <Row>
          <Col xs={12} md={6} className="mb-3 mb-md-0">
            <strong>Dirección</strong>
            <p className="mt-2 mb-0">Av. Libertad 1254, Viña del Mar, Chile</p>
          </Col>
          <Col xs={12} md={6}>
            <strong>Horario</strong>
            <p className="mt-2 mb-0">
              08:00 - 22:00
              <br />
              Lunes a Domingo
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default UbicacionHorario

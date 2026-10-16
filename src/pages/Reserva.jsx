import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import EncabezadoMarca from '../components/EncabezadoMarca'
import ReservaForm from '../components/ReservaForm'
import UbicacionHorario from '../components/UbicacionHorario'
import useTitulo from '../hooks/useTitulo'

function Reserva() {
  useTitulo('Reserva de mesa')

  return (
    <>
      <EncabezadoMarca titulo="Reserva tu mesa" bajada="Elige la fecha, la hora y cuántas personas serán." />

      <section className="seccion-reserva py-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <div className="bg-white rounded-4 shadow-sm p-4 p-md-5">
                <ReservaForm />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <UbicacionHorario />
    </>
  )
}

export default Reserva

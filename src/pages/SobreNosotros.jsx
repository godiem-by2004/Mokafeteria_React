import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Carrusel from '../components/Carrusel'
import { galeria } from '../data/galeria'
import useTitulo from '../hooks/useTitulo'

function SobreNosotros() {
  useTitulo('Sobre nosotros')

  return (
    <Container className="py-5">
      <Row className="align-items-center g-5">
        <Col md={6}>
          <h1 className="fw-bold display-5 brand-title mb-4">Sobre nosotros</h1>
          <p className="lead bajada">
            Fundada en el año 2026, Mokafetería nació con la idea de crear un espacio donde siempre te sientas
            bienvenido, disfrutando de un buen café de especialidad y pastelería horneada a diario.
          </p>
          <p className="bajada">
            Diseñamos un lugar tranquilo donde puedas trabajar, conversar o hacer una pausa agradable con tu café
            favorito y algo rico para acompañar.
          </p>
        </Col>
        <Col md={6}>
          <Carrusel imagenes={galeria} />
        </Col>
      </Row>
    </Container>
  )
}

export default SobreNosotros

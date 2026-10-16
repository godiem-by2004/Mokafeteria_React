import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import UbicacionHorario from '../components/UbicacionHorario'
import useTitulo from '../hooks/useTitulo'

function Inicio() {
  useTitulo('')
  const navigate = useNavigate()

  return (
    <>
      <section className="hero">
        <Container>
          <h1 className="display-3 fw-bold">Bienvenido a Mokafetería</h1>
          <p className="lead hero__texto">
            El mejor sabor y aroma en cada taza, directo a tu mesa. Café de especialidad y pastelería horneada a
            diario en Viña del Mar.
          </p>
          <div className="d-flex flex-wrap gap-2">
            <Button variant="light" size="lg" className="fw-semibold" onClick={() => navigate('/productos')}>
              Ver productos
            </Button>
            <Button variant="outline-light" size="lg" className="fw-semibold" onClick={() => navigate('/reserva')}>
              Reservar mesa
            </Button>
          </div>
        </Container>
      </section>

      <UbicacionHorario />
    </>
  )
}

export default Inicio

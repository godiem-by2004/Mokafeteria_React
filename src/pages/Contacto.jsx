import Container from 'react-bootstrap/Container'
import EncabezadoMarca from '../components/EncabezadoMarca'
import EnlaceContacto from '../components/EnlaceContacto'
import { medios } from '../data/contacto'
import useTitulo from '../hooks/useTitulo'

function Contacto() {
  useTitulo('Contacto')

  return (
    <>
      <EncabezadoMarca titulo="Contacto" bajada="Visítanos en Viña del Mar o escríbenos directamente." />

      <Container className="pb-5">
        <div className="contact-card rounded-4 shadow-sm p-4 mx-auto" style={{ maxWidth: 640 }}>
          <h2 className="h5 text-moka fw-bold mb-4 pb-2 border-bottom">Información y redes</h2>
          <div className="d-flex flex-column gap-3">
            {medios.map((medio) => (
              <EnlaceContacto key={medio.etiqueta} {...medio} />
            ))}
          </div>
        </div>
      </Container>
    </>
  )
}

export default Contacto

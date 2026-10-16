import Container from 'react-bootstrap/Container'
import { medios } from '../data/contacto'

function Footer() {

  const enlaces = medios.filter((m) => m.etiqueta !== 'Dirección')

  return (
    <footer className="footer text-center py-4 mt-auto">
      <Container>
        <p className="mb-1 fw-semibold">&copy; 2026 Mokafetería. Todos los derechos reservados.</p>
        <small className="d-block opacity-75">
          Disfruta de nuestros productos recién hechos con amor y calidad.
        </small>
        <div className="d-flex justify-content-center flex-wrap gap-4 mt-3">
          {enlaces.map(({ etiqueta, href, externo }) => (
            <a key={etiqueta} href={href} {...(externo && { target: '_blank', rel: 'noopener noreferrer' })}>
              {etiqueta}
            </a>
          ))}
        </div>
      </Container>
    </footer>
  )
}

export default Footer

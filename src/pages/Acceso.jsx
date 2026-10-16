import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import LoginForm from '../components/LoginForm'
import RegistroForm from '../components/RegistroForm'
import { useUsuario } from '../context/UsuarioContext'
import useTitulo from '../hooks/useTitulo'

function Acceso() {
  useTitulo('Acceso')
  const navigate = useNavigate()
  const { usuario, cerrarSesion } = useUsuario()

  return (
    <section className="seccion-acceso py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <Card className="auth-card border-0 rounded-4 overflow-hidden">
              {usuario ? (
                <Card.Body className="p-4 p-md-5 text-center">
                  <i className="bi bi-person-circle fs-1 text-caramel"></i>
                  <h1 className="h4 text-moka fw-bold mt-2">Hola, {usuario.nombre}</h1>
                  <p className="text-muted">Ya iniciaste sesión con {usuario.correo}.</p>
                  <div className="d-flex justify-content-center flex-wrap gap-2">
                    <button type="button" className="btn btn-moka" onClick={() => navigate('/productos')}>
                      Ver productos
                    </button>
                    <button type="button" className="btn btn-outline-dark" onClick={cerrarSesion}>
                      Cerrar sesión
                    </button>
                  </div>
                </Card.Body>
              ) : (
                <Tabs defaultActiveKey="login" id="tabs-acceso" fill>
                  <Tab eventKey="login" title="Iniciar sesión" className="p-4 p-md-5">
                    <LoginForm />
                  </Tab>
                  <Tab eventKey="registro" title="Registrarse" className="p-4 p-md-5">
                    <RegistroForm />
                  </Tab>
                </Tabs>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Acceso

import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import { useUsuario } from '../context/UsuarioContext'

vi.mock('../context/UsuarioContext', () => ({
  useUsuario: vi.fn(),
}))

describe('Componente LoginForm', () => {
  const mockIniciarSesion = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    useUsuario.mockReturnValue({
      iniciarSesion: mockIniciarSesion,
    })
  })

  it('renderiza los campos de correo, contraseña y el botón de ingreso', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    )

    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /ingresar/i })).toBeInTheDocument()
  })

  it('permite ingresar valores en los inputs de correo y contraseña', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    )

    const inputCorreo = screen.getByLabelText(/correo electrónico/i)
    const inputPass = screen.getByLabelText(/contraseña/i)

    fireEvent.change(inputCorreo, { target: { name: 'correo', value: 'usuario@correo.cl' } })
    fireEvent.change(inputPass, { target: { name: 'password', value: 'Moka2026' } })

    expect(inputCorreo.value).toBe('usuario@correo.cl')
    expect(inputPass.value).toBe('Moka2026')
  })

  it('no ejecuta iniciarSesion si los campos no cumplen las reglas de formato', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    )

    const btnSubmit = screen.getByRole('button', { name: /ingresar/i })
    fireEvent.click(btnSubmit)

    expect(mockIniciarSesion).not.toHaveBeenCalled()
  })

  it('ejecuta iniciarSesion al enviar datos con formato correcto', () => {
    mockIniciarSesion.mockReturnValue({ ok: true })

    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    )

    const inputCorreo = screen.getByLabelText(/correo electrónico/i)
    const inputPass = screen.getByLabelText(/contraseña/i)
    const btnSubmit = screen.getByRole('button', { name: /ingresar/i })

    fireEvent.change(inputCorreo, { target: { name: 'correo', value: 'usuario@correo.cl' } })
    fireEvent.change(inputPass, { target: { name: 'password', value: 'Moka2026' } })
    fireEvent.click(btnSubmit)

    expect(mockIniciarSesion).toHaveBeenCalledWith('usuario@correo.cl', 'Moka2026')
  })

  it('muestra la alerta de error si iniciarSesion responde sin éxito', () => {
    mockIniciarSesion.mockReturnValue({
      ok: false,
      mensaje: 'Credenciales inválidas, verifica tus datos.',
    })

    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    )

    const inputCorreo = screen.getByLabelText(/correo electrónico/i)
    const inputPass = screen.getByLabelText(/contraseña/i)
    const btnSubmit = screen.getByRole('button', { name: /ingresar/i })

    fireEvent.change(inputCorreo, { target: { name: 'correo', value: 'usuario@correo.cl' } })
    fireEvent.change(inputPass, { target: { name: 'password', value: 'Moka2026' } })
    fireEvent.click(btnSubmit)

    expect(screen.getByText('Credenciales inválidas, verifica tus datos.')).toBeInTheDocument()
  })
})
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useCarrito } from '../context/CarritoContext'
import { useUsuario } from '../context/UsuarioContext'

vi.mock('../context/CarritoContext', () => ({
  useCarrito: vi.fn(),
}))

vi.mock('../context/UsuarioContext', () => ({
  useUsuario: vi.fn(),
}))

describe('Componente Navbar', () => {
  const mockCerrarSesion = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    useCarrito.mockReturnValue({ cantidadTotal: 0 })
    useUsuario.mockReturnValue({ usuario: null, cerrarSesion: mockCerrarSesion })
  })

  it('renderiza la marca de la cafetería y los enlaces principales de navegación', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )

    expect(screen.getByText('Mokafetería')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /^inicio$/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /^productos$/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /^sobre nosotros$/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /^reserva de mesa$/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /^contacto$/i })).toBeInTheDocument()
  })

  it('muestra el enlace "Acceso" y oculta el botón de salir cuando no hay sesión activa', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )

    expect(screen.getByRole('link', { name: 'Acceso' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /cerrar sesión/i })).not.toBeInTheDocument()
  })

  it('muestra el primer nombre del usuario y permite cerrar sesión al hacer clic', () => {
    useUsuario.mockReturnValue({
      usuario: { nombre: 'Darko Araya' },
      cerrarSesion: mockCerrarSesion,
    })

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )

    expect(screen.getByRole('link', { name: /Mi cuenta: Darko Araya/i })).toBeInTheDocument()
    expect(screen.getByText('Darko')).toBeInTheDocument()

    const btnSalir = screen.getByRole('button', { name: /cerrar sesión/i })
    expect(btnSalir).toBeInTheDocument()

    fireEvent.click(btnSalir)
    expect(mockCerrarSesion).toHaveBeenCalledTimes(1)
  })

  it('muestra la insignia con la cantidad de productos cuando el carrito tiene artículos', () => {
    useCarrito.mockReturnValue({ cantidadTotal: 4 })

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )

    expect(screen.getByText('4')).toBeInTheDocument()
  })
})
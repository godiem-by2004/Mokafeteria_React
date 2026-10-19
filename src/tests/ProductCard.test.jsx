import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useCarrito } from '../context/CarritoContext'

vi.mock('../context/CarritoContext', () => ({
  useCarrito: vi.fn(),
}))

describe('Componente ProductCard', () => {
  const mockOnAgregar = vi.fn()

  const productoDisponible = {
    id: 1,
    nombre: 'Cappuccino Italiano',
    descripcion: 'Espresso con leche vaporizada.',
    precio: 3200,
    stock: 5,
    imagen: '/cappuccino.jpg',
  }

  const productoAgotado = {
    id: 2,
    nombre: 'Muffin de Chocolate',
    descripcion: 'Muffin recién horneado.',
    precio: 2500,
    stock: 0,
    imagen: '/muffin.jpg',
  }

  beforeEach(() => {
    vi.clearAllMocks()
    useCarrito.mockReturnValue({ items: [] })
  })

  it('renderiza la información del producto, la imagen y el botón de detalle', () => {
    render(
      <MemoryRouter>
        <ProductCard producto={productoDisponible} onAgregar={mockOnAgregar} />
      </MemoryRouter>
    )

    expect(screen.getByText('Cappuccino Italiano')).toBeInTheDocument()
    expect(screen.getByText('Espresso con leche vaporizada.')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Cappuccino Italiano' })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /ver detalle de cappuccino italiano/i })
    ).toBeInTheDocument()
  })

  it('permite añadir el producto al carrito cuando hay stock disponible', () => {
    render(
      <MemoryRouter>
        <ProductCard producto={productoDisponible} onAgregar={mockOnAgregar} />
      </MemoryRouter>
    )

    const btnAgregar = screen.getByRole('button', {
      name: /añadir cappuccino italiano al carrito/i,
    })
    expect(btnAgregar).not.toBeDisabled()

    fireEvent.click(btnAgregar)
    expect(mockOnAgregar).toHaveBeenCalledTimes(1)
    expect(mockOnAgregar).toHaveBeenCalledWith(productoDisponible)
  })

  it('muestra la etiqueta "Agotado" y deshabilita el botón si no hay existencias', () => {
    render(
      <MemoryRouter>
        <ProductCard producto={productoAgotado} onAgregar={mockOnAgregar} />
      </MemoryRouter>
    )

    expect(screen.getByText('Agotado')).toBeInTheDocument()

    const btnAgregar = screen.getByRole('button', {
      name: /añadir muffin de chocolate al carrito/i,
    })
    expect(btnAgregar).toBeDisabled()
    expect(btnAgregar).toHaveAttribute('title', 'Producto agotado')
  })

  it('muestra "Límite alcanzado" y deshabilita el botón si el carrito iguala el stock disponible', () => {
    useCarrito.mockReturnValue({
      items: [{ producto: { id: 1 }, cantidad: 5 }],
    })

    render(
      <MemoryRouter>
        <ProductCard producto={productoDisponible} onAgregar={mockOnAgregar} />
      </MemoryRouter>
    )

    expect(screen.getByText('Límite alcanzado')).toBeInTheDocument()

    const btnAgregar = screen.getByRole('button', {
      name: /añadir cappuccino italiano al carrito/i,
    })
    expect(btnAgregar).toBeDisabled()
    expect(btnAgregar).toHaveAttribute(
      'title',
      'Has alcanzado el límite de unidades disponibles'
    )
  })
})
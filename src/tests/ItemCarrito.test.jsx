import { render, screen, fireEvent } from '@testing-library/react'
import ItemCarrito from '../components/ItemCarrito'

describe('Componente ItemCarrito', () => {
  const itemMock = {
    producto: { id: 1, nombre: 'Café Espresso Doble', precio: 2400, stock: 10 },
    cantidad: 2,
  }

  it('renderiza el nombre del producto, la cantidad y el subtotal', () => {
    render(<ItemCarrito item={itemMock} onSumar={() => {}} onRestar={() => {}} onQuitar={() => {}} />)
    expect(screen.getByText('Café Espresso Doble')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('ejecuta la función onSumar al presionar el botón "+"', () => {
    const onSumarMock = vi.fn()
    render(<ItemCarrito item={itemMock} onSumar={onSumarMock} onRestar={() => {}} onQuitar={() => {}} />)

    const btnSumar = screen.getByRole('button', { name: /Agregar una unidad/i })
    fireEvent.click(btnSumar)
    expect(onSumarMock).toHaveBeenCalledWith(itemMock.producto)
  })

  it('ejecuta la función onRestar al presionar el botón "-"', () => {
    const onRestarMock = vi.fn()
    render(<ItemCarrito item={itemMock} onSumar={() => {}} onRestar={onRestarMock} onQuitar={() => {}} />)

    const btnRestar = screen.getByRole('button', { name: /Quitar una unidad/i })
    fireEvent.click(btnRestar)
    expect(onRestarMock).toHaveBeenCalledWith(1)
  })

  it('ejecuta la función onQuitar al presionar el botón de eliminar', () => {
    const onQuitarMock = vi.fn()
    render(<ItemCarrito item={itemMock} onSumar={() => {}} onRestar={() => {}} onQuitar={onQuitarMock} />)

    const btnQuitar = screen.getByRole('button', { name: /Eliminar Café Espresso Doble/i })
    fireEvent.click(btnQuitar)
    expect(onQuitarMock).toHaveBeenCalledWith(1)
  })

  it('deshabilita el botón "+" y muestra advertencia al alcanzar el stock disponible', () => {
    const itemMaximo = {
      producto: { id: 1, nombre: 'Café Espresso Doble', precio: 2400, stock: 2 },
      cantidad: 2,
    }
    render(<ItemCarrito item={itemMaximo} onSumar={() => {}} onRestar={() => {}} onQuitar={() => {}} />)

    const btnSumar = screen.getByRole('button', { name: /Agregar una unidad/i })
    expect(btnSumar).toBeDisabled()
    expect(screen.getByText('Máximo disponible alcanzado')).toBeInTheDocument()
  })
})
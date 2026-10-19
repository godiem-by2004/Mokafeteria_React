import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import BarraCategorias from '../components/BarraCategorias'

describe('BarraCategorias', () => {
  const mockCategorias = [
    { id: '1', nombre: 'Bebidas' },
    { id: '2', nombre: 'Postres' }
  ]
  const mockOnSeleccionar = vi.fn()

  it('renderiza las categorías y marca la activa', () => {
    render(
      <BarraCategorias
        categorias={mockCategorias}
        activa="1"
        onSeleccionar={mockOnSeleccionar}
      />
    )

    const btnBebidas = screen.getByRole('button', { name: 'Bebidas' })
    const btnPostres = screen.getByRole('button', { name: 'Postres' })

    expect(btnBebidas).toHaveClass('active')
    expect(btnPostres).not.toHaveClass('active')
  })

  it('ejecuta la función de selección al hacer clic', () => {
    render(
      <BarraCategorias
        categorias={mockCategorias}
        activa="1"
        onSeleccionar={mockOnSeleccionar}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: 'Postres' }))
    expect(mockOnSeleccionar).toHaveBeenCalledWith('2')
  })
})
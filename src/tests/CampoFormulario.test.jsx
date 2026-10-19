import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import CampoFormulario from '../components/CampoFormulario'

describe('CampoFormulario', () => {
  it('renderiza el campo de entrada con sus atributos básicos', () => {
    render(
      <CampoFormulario
        type="email"
        name="email"
        value="test@ejemplo.com"
        onChange={vi.fn()}
      />
    )

    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('type', 'email')
    expect(input).toHaveValue('test@ejemplo.com')
  })

  it('ejecuta onChange cuando el usuario interactúa con el campo', () => {
    const handleChange = vi.fn()
    render(
      <CampoFormulario
        type="text"
        name="nombre"
        value=""
        onChange={handleChange}
      />
    )

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'Diego' } })

    expect(handleChange).toHaveBeenCalled()
  })
})
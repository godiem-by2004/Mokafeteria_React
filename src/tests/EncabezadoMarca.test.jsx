import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import EncabezadoMarca from '../components/EncabezadoMarca'

describe('EncabezadoMarca', () => {
  it('renderiza el título de la marca correctamente', () => {
    render(<EncabezadoMarca titulo="Mokafeteria" />)
    expect(screen.getByRole('heading', { level: 1, name: 'Mokafeteria' })).toBeInTheDocument()
  })
})
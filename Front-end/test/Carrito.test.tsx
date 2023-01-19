import React from 'react'
import { describe, expect, test } from 'vitest'
import { renderWithProviders } from '../src/utils/test-utils'
import Carrito from '../src/components/Tienda/Carrito'

// Unit test
describe('Carrito componente', () => {
    test('El componente se renderiza correctamente', () => {
      const { getAllByText } = renderWithProviders(<Carrito />)
      expect(getAllByText('No hay productos en el carrito')).toBeTruthy()
    })
})
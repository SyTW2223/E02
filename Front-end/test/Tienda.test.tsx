import React from 'react'
import { describe, expect, test } from 'vitest'
import { renderWithProviders } from '../src/utils/test-utils'
import Tienda from '../src/components/Tienda/Tienda'

describe('CardDisplay componente', () => {
  test('El componente se renderiza correctamente', () => {
    const { getAllByRole } = renderWithProviders(<Tienda />)
    expect(getAllByRole('heading')).toBeTruthy()
  })
})

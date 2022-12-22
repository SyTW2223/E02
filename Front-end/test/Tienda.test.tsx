import React from 'react'
import { describe, expect, test } from 'vitest'
import { renderWithProviders } from '../src/utils/test-utils'
import Tienda from '../src/components/Tienda/Tienda'

describe('CardDisplay componente', () => {
  test('El elemento tiene la clase "container-fluid"', () => {
    const container = renderWithProviders(<Tienda />)
    expect(container).toBeTruthy()
  })
})

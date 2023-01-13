import React from 'react'
import { describe, expect, test } from 'vitest'
import { renderWithProviders } from '../src/utils/test-utils'
import Navbar from '../src/components/Home/Navbar'

// Unit test
describe('Navbar componente', () => {
  test('El componente se renderiza correctamente', () => {
    const { getByRole } = renderWithProviders(<Navbar />)
    expect(getByRole('navigation')).toBeTruthy()
  })
})

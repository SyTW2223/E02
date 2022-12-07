import React from 'react'
import { describe, expect, test } from 'vitest'
import { renderWithProviders } from '../src/utils/test-utils'
import Footer from '../src/components/Footer'

describe('Footer componente', () => {
  test('El componente se renderiza correctamente', () => {
    const { getByRole } = renderWithProviders(<Footer />)
    expect(getByRole('contentinfo')).toBeTruthy()
  })
})

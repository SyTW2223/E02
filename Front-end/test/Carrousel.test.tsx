import React from 'react'
import { describe, expect, test } from 'vitest'
import { renderWithProviders } from '../src/utils/test-utils'
import Carrousel from '../src/components/Home/Carrousel'

describe('Carrousel componente', () => {
  test('El componente se renderiza correctamente', () => {
    const { getAllByRole } = renderWithProviders(<Carrousel />)
    expect(getAllByRole('img')).toBeTruthy()
  })
})

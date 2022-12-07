import React from 'react'
import { describe, expect, test } from 'vitest'
import { renderWithProviders } from '../src/utils/test-utils'
import Home from '../src/components/Home'

describe('Home componente', () => {
  test('El componente se renderiza correctamente', () => {
    const { getByText } = renderWithProviders(<Home />)
    expect(getByText('Home')).toBeTruthy()
  })
})

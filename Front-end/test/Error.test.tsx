import React from 'react'
import { describe, expect, test } from 'vitest'
import { renderWithProviders } from '../src/utils/test-utils'
import Error from '../src/components/Error'

// Unit test
describe('Error componente', () => {
  test('El componente se renderiza correctamente', () => {
    const { getByText } = renderWithProviders(<Error />)
    expect(getByText('404')).toBeTruthy()
  })
})

import React from 'react'
import { describe, expect, test } from 'vitest'
import { renderWithProviders } from '../src/utils/test-utils'
import Error from '../src/components/Error'

describe('Error componente', () => {
  test('El componente se renderiza correctamente', () => {
    const { getByRole } = renderWithProviders(<Error />)
    expect(getByRole('heading')).toBeTruthy()
  })
})

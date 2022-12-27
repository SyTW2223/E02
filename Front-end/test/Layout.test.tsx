import React from 'react'
import { describe, expect, test } from 'vitest'
import { renderWithProviders } from '../src/utils/test-utils'
import Layout from '../src/components/Home/Layout'

describe('Layout componente', () => {
  test('El componente se renderiza correctamente', () => {
    const { getByRole } = renderWithProviders(<Layout />)
    expect(getByRole('navigation')).toBeTruthy()
  })
})

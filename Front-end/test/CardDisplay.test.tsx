import React from 'react'
import { describe, expect, test } from 'vitest'
import { renderWithProviders } from '../src/utils/test-utils'
import CardDisplay from '../src/components/Card/CardDisplay'

describe('CardDisplay componente', () => {
  test('El componente se renderiza correctamente', () => {
    const { getAllByRole } = renderWithProviders(<CardDisplay />)
    expect(getAllByRole('heading')).toBeTruthy()
  })
})

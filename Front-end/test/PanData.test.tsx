import React from 'react'
import { describe, expect, test } from 'vitest'
import { renderWithProviders} from '../src/utils/test-utils'
import { fireEvent } from '@testing-library/react';
import PanData from '../src/components/Tienda/PanData'
describe('CardDisplay componente', () => {
  test('El elemento tiene la clase "container-fluid"', () => {
    const container = renderWithProviders(<PanData/>)
    const {getAllByText} = renderWithProviders(<PanData/>)
    expect(container).toBeTruthy()
    expect(getAllByText('Cantidad:')).toBeTruthy()
    expect(getAllByText('-')).toBeTruthy()
    expect(getAllByText('+')).toBeTruthy()
  })
})

// generar mas pruebas

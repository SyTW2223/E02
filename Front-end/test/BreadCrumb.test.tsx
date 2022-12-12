import React from 'react'
import { describe, expect, test } from 'vitest'
import { renderWithProviders } from '../src/utils/test-utils'
import BreadCrumb from '../src/components/BreadCrumb'

describe('Breadcrum componente', () => {
  test('El componente se renderiza correctamente', () => {
    const { getByLabelText } = renderWithProviders(<BreadCrumb />)
    expect(getByLabelText('breadcrumb')).toBeTruthy()
  })
})

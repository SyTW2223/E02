import React from 'react'
import { describe, expect, test } from 'vitest'
import { renderWithProviders } from '../src/utils/test-utils'
import Video from '../src/components/Home/Video'

describe('Video componente', () => {
  test('El componente se renderiza correctamente', () => {
    const { getByTitle } = renderWithProviders(<Video />)
    expect(getByTitle('YouTube video')).toBeTruthy()
  })
})

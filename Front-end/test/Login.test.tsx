import React from 'react'
import { describe, expect, test, vi } from 'vitest'
import { fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../src/utils/test-utils'
import Login from '../src/components/Login'
import { login, register, logout } from '../src/_services'

/* describe('Pruebas E2E', () => {
  test('Incia sesión', async () => {
    vi.mock('../src/_services', () => ({
      login: vi.fn(() => Promise.resolve({ res: 200, usuario: [{ nombre: 'Marco', apellidos: 'Cabrera', correo: 'marco@gmail.com', password: '123456' }], token: 'token' })),
    }));

    const result = await login(' ', ' ');
    expect(result).toEqual({ res: 200, usuario: [{ nombre: 'Marco', apellidos: 'Cabrera', correo: 'marco@gmail.com', password: '123456' }], token: 'token' });
  });
}); */


describe('Login componente', () => {
  describe('Pruebas Unitarias', () => {
    test('El componente se renderiza correctamente', () => {
      const { getByTestId } = renderWithProviders(<Login />)

      expect(getByTestId('login')).toBeTruthy()
    })

    test('El componente tiene los elementos correctos', () => {
      const { getByTestId } = renderWithProviders(<Login />)

      expect(getByTestId('login')).toBeTruthy()
      expect(getByTestId('register')).toBeTruthy()
    })
  });

  describe('Pruebas de Integración', () => {
    test('El correo y la password correcta', () => {
      // Datos iniciales
      const signin = [{ correo: 'marco@gmail.com', password: '12345678' }]
      const { getByTestId, getByText } = renderWithProviders(<Login />)

      // Rellenar los datos
      fireEvent.change(getByTestId('correo signin'), { target: { value: signin[0].correo } })
      fireEvent.change(getByTestId('password signin'), { target: { value: signin[0].password } })
      fireEvent.click(getByText(/Entrar/i));

      // Comprobar que los datos iniciales son correctos
      expect(getByTestId('correo signin').value).toBe(signin[0].correo)
      expect(getByTestId('password signin').value).toBe(signin[0].password)

      // Borrar datos
      fireEvent.change(getByTestId('correo signin'), { target: { value: '' } })
      fireEvent.change(getByTestId('password signin'), { target: { value: '' } })
    })

    test('El registro de los datos correctamente', () => {
      // Datos iniciales
      const signup = [{ nombre: 'Marco', apellidos: 'Cabrera', correo: 'marco@gmail.com', password: '12345678'}]
      const { getByTestId, getByText } = renderWithProviders(<Login />)

      // Click en el botón de crear una cuenta
      fireEvent.click(getByText(/Crear Una Cuenta/i));

      // Rellenar los datos
      fireEvent.change(getByTestId('nombre signup'), { target: { value: signup[0].nombre } })
      fireEvent.change(getByTestId('apellidos signup'), { target: { value: signup[0].apellidos } })
      fireEvent.change(getByTestId('correo signup'), { target: { value: signup[0].correo } })
      fireEvent.change(getByTestId('password signup'), { target: { value: signup[0].password } })
      fireEvent.click(getByText(/Siguiente/i));

      // Comprobar que los datos se han rellenado correctamente
      expect(getByTestId('nombre signup').value).toBe(signup[0].nombre)
      expect(getByTestId('apellidos signup').value).toBe(signup[0].apellidos)
      expect(getByTestId('correo signup').value).toBe(signup[0].correo)
      expect(getByTestId('password signup').value).toBe(signup[0].password)

      // Borrar datos
      fireEvent.change(getByTestId('nombre signup'), { target: { value: '' } })
      fireEvent.change(getByTestId('apellidos signup'), { target: { value: '' } })
      fireEvent.change(getByTestId('correo signup'), { target: { value: '' } })
      fireEvent.change(getByTestId('password signup'), { target: { value: '' } })
    })
  });
});
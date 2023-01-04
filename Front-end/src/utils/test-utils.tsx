import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import userReducer from '../features/user/userSlice'
import carritoReducer from '../features/carrito/carritoSlice'
import type { store } from '../app/store'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}


// Esta interfaz de tipo amplía las opciones predeterminadas para renderizar desde RTL, también
// permite al usuario especificar otras cosas como initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  store?: typeof store
}

const persistedReducerUser = persistReducer(persistConfig, userReducer);
const persistedReducerCarrito = persistReducer(persistConfig, carritoReducer);

export function renderWithProviders(
  ui: React.ReactElement,
  {
    // Crear automáticamente una instancia de tienda si no se pasó ninguna tienda
    store = configureStore({ reducer: { carrito: persistedReducerCarrito, userState: persistedReducerUser } }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }

  // Devuelve un objeto con la tienda y todas las funciones de consulta de RTL
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
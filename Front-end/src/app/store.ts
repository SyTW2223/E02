import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import carritoReducer from "../features/carrito/carritoSlice";

import {
  persistStore,
  persistReducer,
  PERSIST,
} from 'redux-persist'

import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const persistedReducerUser = persistReducer(persistConfig, userReducer);
const persistedReducerCarrito = persistReducer(persistConfig, carritoReducer);

export const store = configureStore({
  reducer: {
    userState: persistedReducerUser,
    carrito: persistedReducerCarrito
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [PERSIST],
    },
  }),
});

export let persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

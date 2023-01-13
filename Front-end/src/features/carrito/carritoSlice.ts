import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

export type carritoType = {
  id: string,
  cantidad: number
}

interface carritoInterface {
  carritoData: carritoType[]
}

const initialState: carritoInterface = {
  carritoData: []
}

export const carritoSlice = createSlice ({
  name: 'carrito',
  initialState,
  reducers: {
    añadir: (state,  action: PayloadAction<carritoType>) => {
      state.carritoData.push(action.payload);
    },
    sumar: (state, action: PayloadAction<carritoType>) => {
      state.carritoData.map((producto) => {
        if (producto.id === action.payload.id) {
          producto.cantidad += action.payload.cantidad;
        }
      })
    },
    ordenar: (state) => {
      state.carritoData.sort((a, b) => {
        if (a.id > b.id) {
          return 1;
        }
        if (a.id < b.id) {
          return -1;
        }
        return 0;
      })
    },
    valor1: (state, action: PayloadAction<carritoType>) => {
      state.carritoData.map((producto) => {
        if (producto.id === action.payload.id) {
          producto.cantidad = 1;
        }
      })
    },
    eliminar: (state, action: PayloadAction<string>) => {
      state.carritoData.map((producto, index) => {
        if (producto.id === action.payload) {
          state.carritoData.splice(index, 1);
        }
      })

    },
    eliminarTodo: (state) => {
      state.carritoData = [];
    }
  }
})


export const {añadir, sumar, ordenar, valor1, eliminar, eliminarTodo} = carritoSlice.actions;
export const selectCarrito = (state: RootState) => state.carrito;

export default carritoSlice.reducer;
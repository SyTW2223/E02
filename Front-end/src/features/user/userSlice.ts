import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

interface userInterface {
  userData: {
    nombre: string,
    apellidos: string,
    correo: string,
    password: string,
    token: string
  }
}

const initialState: userInterface = {
  userData: {
    nombre: "",
    apellidos: "",
    correo: "",
    password: "",
    token: ""
  },
}

export type userType = {
  nombre: string,
  apellidos: string,
  correo: string,
  password: string,
  token: string
}

export type personalInformationType = {
  nombre: string,
  apellidos: string,
}

export const userSlice = createSlice ({
  name: 'usuario',
  initialState,
  reducers: {
    loginRegister: (state,  action: PayloadAction<userType>) => {
      state.userData = action.payload;
    },
    logout: (state) => {
      state.userData = initialState.userData;
    },
    changePersonalInformation: (state,  action: PayloadAction<personalInformationType>) => {
      state.userData.nombre = action.payload.nombre;
      state.userData.apellidos = action.payload.apellidos;
    }
  }
})


export const {loginRegister, logout, changePersonalInformation} = userSlice.actions;
export const selectUser = (state: RootState) => state.userState;

export default userSlice.reducer;
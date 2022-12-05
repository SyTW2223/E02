import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: [],
    reducers: {
        login: (state:any, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout: (state:any) => {
            state.user = null;
            state.token = null;
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
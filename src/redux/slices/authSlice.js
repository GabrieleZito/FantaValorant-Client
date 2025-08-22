import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        accessToken: null,
        user: null,
        isAuthenticated: false,
        expiresAt: null,
        isLoading: true,
        error: null,
    },
    reducers: {
        setToken: (state, action) => {
            state.accessToken = action.payload;
        },
        clearToken: (state) => {
            state.accessToken = null;
        },
        loginStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.error = null;
        },
        loginError: (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.accessToken = null;
            state.user = null;
            state.error = action.payload;
        },
        refreshTokenSuccess: (state, action) => {
            state.accessToken = action.payload.accessToken;
        },
        refreshTokenError: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.accessToken = null;
        },
        logoutStart: (state) => {
            state.isLoading = true;
        },
        logoutSuccess: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.accessToken = null;
            state.isLoading = false;
            state.error = null;
        },
    },
});

export const { setToken, clearToken, loginStart, loginError, loginSuccess, logoutStart, logoutSuccess, refreshTokenError, refreshTokenSuccess } =
    authSlice.actions;
export default authSlice.reducer;

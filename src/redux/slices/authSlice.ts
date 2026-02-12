import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    accessToken: string | null;
    user: string | null;
    isAuthenticated: boolean;
    expiresAt: number | null;
    isLoading: boolean;
    error: string;
}

const initialState: AuthState = {
    accessToken: null,
    user: null,
    isAuthenticated: false,
    expiresAt: null,
    isLoading: true,
    error: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
});

export default authSlice.reducer;

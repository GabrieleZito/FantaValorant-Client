import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authAPI from "../../API/authAPI";
import type { LoginType, RegisterType, User } from "../../types/user";

interface AuthState {
    accessToken: string | null;
    user: User | null;
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
    isLoading: false,
    error: "",
};

export const login = createAsyncThunk("auth/login", async (credentials: LoginType, { rejectWithValue }) => {
    try {
        const response = await authAPI.login(credentials);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Login failed");
    }
});

export const registerUser = createAsyncThunk("auth/register", async (userData: RegisterType, { rejectWithValue }) => {
    try {
        const response = await authAPI.register(userData);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || "Registration failed");
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = "";
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                state.accessToken = "";
                state.isAuthenticated = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.error = "";
                state.isLoading = false;
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.isAuthenticated = true;
            });

        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                const error = action.payload as { data: { field: string }; message: string };
                state.error = error.message as string;
                state.isLoading = false;
                state.isAuthenticated = false;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                console.log(action);
                state.accessToken = action.payload.accessToken;
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.isLoading = false;
            });
    },
});

export default authSlice.reducer;

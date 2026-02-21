import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import authAPI from "../../API/authAPI";
import type { LoginType, RegisterType, User } from "../../types/types";
import type { RootState } from "../store";

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

export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
    try {
        const response = await authAPI.logout();
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data.message || "Logout failed");
    }
});

export const refreshAccessToken = createAsyncThunk("auth/refreshAccess", async (_, { rejectWithValue }) => {
    try {
        const response = await authAPI.refresh();
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data.message || "Session Expired");
    }
});

export const checkAuth = createAsyncThunk("auth/checkAuth", async (_, { rejectWithValue }) => {
    try {
        const response = await authAPI.me();
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Not authenticated");
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        updateAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
    },
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
                state.user = action.payload!.user;
                state.accessToken = action.payload!.accessToken;
                state.isAuthenticated = true;
            });

        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                const error = action.payload as {
                    data: { field: string };
                    message: string;
                };
                state.error = error.message as string;
                state.isLoading = false;
                state.isAuthenticated = false;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                console.log(action);
                const payload = action.payload as {
                    user: User;
                    accessToken: string;
                };
                state.accessToken = payload.accessToken;
                state.user = payload.user;
                state.isAuthenticated = true;
                state.isLoading = false;
            });

        builder
            .addCase(logout.pending, () => {})
            .addCase(logout.rejected, () => {})
            .addCase(logout.fulfilled, (state) => {
                state = initialState;
            });
        builder
            .addCase(refreshAccessToken.rejected, (state) => {
                state = initialState;
            })
            .addCase(refreshAccessToken.fulfilled, (state, action) => {
                state.accessToken = action.payload?.accessToken as string;
            });

        builder
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isLoading = false;
                state = initialState;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload!.user;
                state.accessToken = action.payload!.accessToken;
                state.isAuthenticated = true;
                state.error = "";
            });
    },
});

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const { updateAccessToken } = authSlice.actions;
export default authSlice.reducer;

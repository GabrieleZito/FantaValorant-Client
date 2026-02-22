// services/api.ts
import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import { logout, updateAccessToken } from "@/redux/slices/authSlice";
import { store } from "@/redux/store";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Create axios instance
export const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

// Request interceptor - Add access token to headers
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const state = store.getState();
        const accessToken = state.auth.accessToken;

        if (accessToken && config.headers) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// Response interceptor - Handle token refresh
let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value?: unknown) => void;
    reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve();
        }
    });

    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Se l'errore è 401 e non abbiamo ancora provato a fare refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
            // Se stiamo già refreshando, metti la richiesta in coda
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(() => {
                        return api(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // Chiama l'endpoint di refresh
                // Il refresh token è nei cookies, quindi viene inviato automaticamente
                const response = await axios.get(
                    `${API_URL}/auth/refresh`,
                    { withCredentials: true }, // Invia cookies
                );

                const { accessToken } = response.data.data;

                // Aggiorna l'access token nello store Redux
                store.dispatch(updateAccessToken(accessToken));

                // Aggiorna l'header della richiesta originale
                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                }

                // Processa tutte le richieste in coda
                processQueue();

                // Riprova la richiesta originale
                return api(originalRequest);
            } catch (refreshError) {
                // Se il refresh fallisce, logout
                processQueue(refreshError);
                store.dispatch(logout());

                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    },
);

export default api;

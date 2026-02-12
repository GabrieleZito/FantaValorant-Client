import { setToken, clearToken } from "@/redux/slices/authSlice";
import store from "@/redux/store";
import axios from "axios";
const URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const axiosConf = axios.create({
    withCredentials: true,
});

// Response interceptor → handle 401 and try refresh
let isRefreshing = false;
let refreshSubscribers = [];

function subscribeTokenRefresh(cb) {
    refreshSubscribers.push(cb);
}

function onRefreshed(token) {
    refreshSubscribers.forEach((cb) => cb(token));
    refreshSubscribers = [];
}

axiosConf.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;

        // Skip refresh logic for auth endpoints (login, register, logout)
        const isAuthEndpoint =
            originalRequest.url?.includes("/auth/login") ||
            originalRequest.url?.includes("/auth/register") ||
            originalRequest.url?.includes("/auth/logout");

        if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
            originalRequest._retry = true;

            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    const data = await refresh();
                    isRefreshing = false;
                    onRefreshed(data.accessToken);
                    return axiosConf(originalRequest);
                } catch (err) {
                    isRefreshing = false;
                    store.dispatch(clearToken());
                    return Promise.reject(err);
                }
            }

            return new Promise((resolve) => {
                subscribeTokenRefresh((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    resolve(axiosConf(originalRequest));
                });
            });
        }

        return Promise.reject(error);
    },
);

const register = async (user) => {
    const res = await axiosConf.post(`${URL}/auth/register`, user);
    return res.data;
};

const login = async (credentials) => {
    const res = await axiosConf.post(`${URL}/auth/login`, credentials);
    return res.data;
};

const logout = async () => {
    const res = await axiosConf.post(`${URL}/auth/logout`);
    return res.data;
};

const refresh = async () => {
    const res = await axiosConf.get(`${URL}/auth/refresh`);
    console.log("REFRESH");
    console.log(res.data);

    if (res.data.accessToken) {
        store.dispatch(setToken(res.data.accessToken));
    }
    return res.data;
};

const me = async () => {
    const res = await axios.get(`${URL}/auth/me`, { withCredentials: true });
    return res.data;
};

const prova = async () => {
    const res = await axios.get(`${URL}/prova`, { withCredentials: true });
    return res.data;
};

const authAPI = {
    register,
    login,
    logout,
    refresh,
    me,
    prova,
};

export default authAPI;

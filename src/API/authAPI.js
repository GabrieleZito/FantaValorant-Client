import { setToken } from "@/redux/slices/authSlice";
import store from "@/redux/store";
import axios from "axios";
const URL = import.meta.env.VITE_API_URL;
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

        if (error.response?.status === 401 && !originalRequest._retry) {
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
    if (res.data.accessToken) {
        store.dispatch(setToken(res.data.accessToken));
    }
    return res.data;
};

const authAPI = {
    register,
    login,
    logout,
    refresh,
};

export default authAPI;

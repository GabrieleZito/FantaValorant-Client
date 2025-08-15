import { setToken, clearToken } from "@/redux/slices/authSlice";
import store from "@/redux/store";
import axios from "axios";
const URL = import.meta.env.VITE_API_URL;
const axiosConf = axios.create({
    withCredentials: true,
});

//include the Authorization header for every request
axiosConf.interceptors.request.use((config) => {
    const { accessToken } = store.getState().auth;
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

let isRefreshing = false;
let refreshSubscribers = [];

//if the access token is expired refresh it and retry the request
axiosConf.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (isRefreshing) {
                return new Promise((resolve) => {
                    refreshSubscribers.push((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        resolve(axiosConf(originalRequest));
                    });
                });
            }

            isRefreshing = true;

            try {
                const response = await axiosConf.get(`${URL}/auth/refresh`);
                const { accessToken } = response.data;
                console.log("nuovo access token_awdawd");

                store.dispatch(setToken(accessToken));
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                refreshSubscribers.forEach((callback) => callback(accessToken));
                refreshSubscribers = [];
                isRefreshing = false;

                return axiosConf(originalRequest);
            } catch (refreshError) {
                console.log("dentro refreshError: " + refreshError);

                store.dispatch(clearToken());
                isRefreshing = false;
                refreshSubscribers = [];
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    },
);

export default axiosConf;

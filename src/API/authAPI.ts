import axios from "axios";
import type { LoginType, RegisterType } from "../types/user";
const URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const axiosConf = axios.create({
    baseURL: URL,
    withCredentials: true,
});

const register = async (user: RegisterType) => {
    const res = await axiosConf.post(`${URL}/auth/register`, user);
    return res.data;
};

const login = async (credentials: LoginType) => {
    const res = await axiosConf.post(`/auth/login`, credentials);
    return res.data;
};

const logout = async () => {
    const res = await axiosConf.post(`/auth/logout`);
    return res.data;
};

const authAPI = {
    register,
    login,
    logout,
};

export default authAPI;

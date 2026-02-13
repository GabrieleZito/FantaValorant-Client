import axios from "axios";
import type { LoginType, RegisterType, ServerResponse, User } from "../types/types";
const URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const axiosConf = axios.create({
    baseURL: URL,
    withCredentials: true,
});

const register = async (user: RegisterType): Promise<ServerResponse<{ user: User; accessToken: string } | { field: string } | null>> => {
    const res = await axiosConf.post(`${URL}/auth/register`, user);
    return res.data;
};

const login = async (credentials: LoginType): Promise<ServerResponse<{ user: User; accessToken: string } | null>> => {
    const res = await axiosConf.post(`/auth/login`, credentials);
    return res.data;
};

const logout = async (): Promise<ServerResponse<null>> => {
    const res = await axiosConf.post(`/auth/logout`);
    return res.data;
};

const authAPI = {
    register,
    login,
    logout,
};

export default authAPI;

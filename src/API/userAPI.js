import axios from "axios";
const URL = import.meta.env.VITE_API_URL;
const axiosConf = axios.create({
    withCredentials: true,
});

const register = async (user) => {
    const res = await axiosConf.post(`${URL}/auth/register`, user);
    return res.data;
};

const login = async (credentials) => {
    const res = await axiosConf.post(`${URL}/auth/login`, credentials);
    return res.data;
};

const userAPI = {
    register,
    login,
};

export default userAPI;

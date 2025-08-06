import axios from "axios";
const URL = import.meta.env.VITE_API_URL;
const axiosConf = axios.create({
    withCredentials: true,
});

const friendRequest = async (data) => {
    const res = await axiosConf.post(`${URL}/users/friends/request`, data);
    return res.data;
};

const userAPI = {
    friendRequest,
};

export default userAPI;

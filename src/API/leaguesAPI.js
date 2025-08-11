import axios from "axios";
const URL = import.meta.env.VITE_API_URL;
const axiosConf = axios.create({
    withCredentials: true,
});

const createLeague = async (data) => {
    const res = await axiosConf.post(`${URL}/leagues`, data);
    return res.data;
};

const leaguesAPI = {
    createLeague,
};

export default leaguesAPI;

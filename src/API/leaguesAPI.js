const URL = import.meta.env.VITE_API_URL;
import axiosConf from "./axiosConf";

const createLeague = async (data) => {
    const res = await axiosConf.post(`${URL}/leagues`, data);
    return res.data;
};

const getUserLeagues = async () => {
    const res = await axiosConf.get(`${URL}/leagues`);
    return res.data;
};

const leaguesAPI = {
    createLeague,
    getUserLeagues,
};

export default leaguesAPI;

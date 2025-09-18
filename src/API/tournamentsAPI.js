const URL = import.meta.env.VITE_API_URL;
import axiosConf from "./axiosConf";

const getNextTournaments = async () => {
    const res = await axiosConf.get(`${URL}/tournaments/next`);
    return res.data;
};

const getSeries = async () => {
    const res = await axiosConf.get(`${URL}/tournaments/series`);
    return res.data;
};

const tournamentsAPI = {
    getNextTournaments,
    getSeries,
};

export default tournamentsAPI;

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

const getLeagueDetails = async (name) => {
    const res = await axiosConf.get(`${URL}/leagues/${name}`);
    return res.data;
};

const createTeam = async (data) => {
    const res = await axiosConf.post(`${URL}/leagues/teams`, data);
    return res.data;
};

const craeteAuction = async (data) => {
    const res = await axiosConf.post(`${URL}/leagues/auctions`, data);
    return res.data;
};

const leaguesAPI = {
    createLeague,
    getUserLeagues,
    getLeagueDetails,
    createTeam,
    craeteAuction,
};

export default leaguesAPI;

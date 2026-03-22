import api from "./config";

//TODO aggiungere tipo
const getTeams = async () => {
    const res = await api.get(`/esport/teams`);
    return res.data;
};

const esportAPI = {
    getTeams,
};

export default esportAPI;

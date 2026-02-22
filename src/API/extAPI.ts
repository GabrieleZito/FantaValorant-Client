import type { Agent } from "@/types/valAPITypes";
import axios from "axios";

const api = axios.create({
    baseURL: "https://valorant-api.com/v1",
});

const getAgents = async (): Promise<Agent[]> => {
    const res = await api.get("/agents");

    return res.data.data;
};

const extAPI = {
    getAgents,
};
export default extAPI;

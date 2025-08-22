const URL = import.meta.env.VITE_API_URL;
import store from "@/redux/store";
import axiosConf from "./axiosConf";

const friendRequest = async (data) => {
    const res = await axiosConf.post(`${URL}/users/friend-requests`, data);
    return res.data;
};

const getFriendRequests = async () => {
    const res = await axiosConf.get(`${URL}/users/friend-requests/received`);
    return res.data;
};

const acceptFriendRequest = async (requestId) => {
    const res = await axiosConf.patch(`${URL}/users/friend-requests/${requestId}/accept`);
    return res.data;
};

const declineFriendRequest = async (requestId) => {
    const res = await axiosConf.patch(`${URL}/users/friend-requests/${requestId}/decline`);
    return res.data;
};

const getFriends = async () => {
    const res = await axiosConf.get(`${URL}/users/friends`);
    return res.data;
};

const userAPI = {
    friendRequest,
    getFriendRequests,
    acceptFriendRequest,
    declineFriendRequest,
    getFriends,
};

export default userAPI;

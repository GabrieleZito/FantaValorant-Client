import type { ServerResponse, User } from "@/types/types";
import api from "./config";


const friendRequest = async (data: { username: string }): Promise<ServerResponse<null>> => {
    const res = await api.post(`/users/friend-requests`, data);
    console.log(res);

    return res.data;
};

const getFriendRequests = async () => {
    const res = await api.get(`/users/friend-requests/received`);
    return res.data;
};

const acceptFriendRequest = async (requestId: number) => {
    const res = await api.patch(`/users/friend-requests/${requestId}/accept`);
    return res.data;
};

const declineFriendRequest = async (requestId: number) => {
    const res = await api.patch(`/users/friend-requests/${requestId}/decline`);
    return res.data;
};

const getFriends = async () => {
    const res = await api.get(`/users/friends`);
    return res.data;
};

const getInvites = async () => {
    const res = await api.get(`/users/invites/received`);
    console.log(res.data);

    return res.data;
};

const sendInvite = async (data: { leagueId: number; selectedFriend: User }) => {
    const res = await api.post(`/users/invites`, data);
    return res.data;
};

const acceptInvite = async (requestId: number) => {
    const res = await api.patch(`/users/invites/${requestId}/accept`);
    return res.data;
};

const declineInvite = async (requestId: number) => {
    const res = await api.patch(`/users/invites/${requestId}/decline`);
    return res.data;
};

const userAPI = {
    friendRequest,
    getFriendRequests,
    acceptFriendRequest,
    declineFriendRequest,
    getFriends,
    sendInvite,
    getInvites,
    acceptInvite,
    declineInvite,
};

export default userAPI;

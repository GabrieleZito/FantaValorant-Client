import { useSocket } from "@/contexts/SocketContext";
import { useEffect } from "react";

export function useAuctionSocket({ getLeagueDetails, setUsers }) {
    const { socket, isConnected } = useSocket();

    useEffect(() => {
        if (socket && isConnected && getLeagueDetails.isSuccess && getLeagueDetails.data?.data?.Auction) {
            const league = getLeagueDetails.data.data;
            socket.emit("auction:join", { auctionId: league.Auction.id });
        }
    }, [socket, isConnected]);

    useEffect(() => {
        socket.on("auction:users", handleUpdateUsers);

        function handleUpdateUsers(data) {
            console.log(data);
            setUsers(data);
        }

        return () => {
            socket.off("auction:users", handleUpdateUsers);
            socket.emit("auction:leave", { auctionId: getLeagueDetails.data?.data?.Auction?.id });
        };
    }, []);
}

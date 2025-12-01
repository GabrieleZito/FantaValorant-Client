import { useSelector } from "react-redux";
import { socket } from "@/utils/socket";

import { createContext, useContext, useEffect, useState } from "react";

const SocketContext = createContext();

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocket must be used within a socket provider");
    }
    return context;
};

export const SocketProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        if (user?.id) {
            socket.connect();
            socket.on("connect", () => setIsConnected(true));
            socket.on("disconnect", () => setIsConnected(false));

            socket.emit("user:register", { userId: user.id, username: user.username, propic: user.propic });
            socket.on("user:registered", (data) => {
                console.log(data);
            });

            return () => {
                socket.off("connect");
                socket.off("disconnect");
                socket.off("user:registered");
                socket.disconnect();
            };
        }
    }, [user?.id, socket]);

    return <SocketContext.Provider value={{ socket, isConnected }}>{children}</SocketContext.Provider>;
};

import { Search } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import userAPI from "@/API/userAPI";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { getTimeAgo } from "@/utils/timePassed";
import { useLocation } from "react-router";
import { useBreadcrumb } from "@/hooks/useBreadcrumb";

export function Friends() {
    const [search, setSearch] = useState("");
    const location = useLocation();
    const dispatch = useDispatch();
    useBreadcrumb(dispatch, location.pathname);

    const sendRequest = useMutation({
        mutationFn: userAPI.friendRequest,
        mutationKey: ["friendRequest"],
        onSuccess: (res) => {
            console.log(res);
            toast.success(res.message, { position: "top-center" });
        },
        onError: (res) => {
            console.log(res.response);
            toast.error(res.response.data.message, {
                position: "top-center",
            });
        },
    });

    const submit = (e) => {
        e.preventDefault();
        sendRequest.mutate({ username: search });
    };

    const getFriends = useQuery({
        queryKey: ["getFriends"],
        queryFn: userAPI.getFriends,
        retry: false,
    });
    //console.log(getFriends.data);

    return (
        <>
            <div className="h-full p-4">
                <form onSubmit={submit}>
                    <div className="relative">
                        <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
                            <Search size={20} />
                        </div>
                        <input
                            type="search"
                            id="search"
                            className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 ps-10 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            placeholder="Username"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            className="absolute end-2.5 bottom-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Send Request
                        </button>
                    </div>
                </form>
                <div className="flex flex-col h-full">
                    <p className="flex justify-center mt-2 text-2xl text-foreground">Your Friends</p>
                    <div className="justify-center h-full tex-center">
                        {getFriends.data && getFriends.data.data && getFriends.data.data.length > 0 ? (
                            getFriends.data.data.map((f) => {

                                return (
                                    <div
                                        key={f.id}
                                        className="flex items-center justify-between p-3 mt-2 transition-colors border rounded-lg bg-card hover:bg-accent/50"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <Avatar className="w-10 h-10">
                                                <AvatarImage src={f.propic} alt={f.username} />
                                                <AvatarFallback>{f.username.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex items-center">
                                                <p className="font-semibold text-foreground">{f.username}</p>
                                                {/* <p className="text-sm text-muted-foreground">@{f.username}</p> */}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-end w-full px-5 text-foreground">{getTimeAgo(f.updatedAt)}</div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="flex justify-center h-full text-center text-foreground">You have no friends :)</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

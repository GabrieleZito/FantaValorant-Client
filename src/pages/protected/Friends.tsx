import userAPI from "@/API/userAPI";
import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import { getTimeAgo } from "@/lib/timePassed";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router";

export function Friends() {
    const [search, setSearch] = useState("");

    const location = useLocation();
    useBreadcrumb(location.pathname);

    const getFriends = useQuery({
        queryKey: ["getFriends"],
        queryFn: userAPI.getFriends,
        retry: false,
    });

    const sendRequest = useMutation({
        mutationFn: userAPI.friendRequest,
        mutationKey: ["friendRequest"],
        onSuccess: (res) => {
            console.log(res);
            toast.success(res.message, { position: "top-center" });
        },
        onError: (error: any) => {
            console.log(error);
            toast.error(error.response?.data?.message || "An error occurred", {
                position: "top-center",
            });
        },
    });

    const submit = (e: any) => {
        e.preventDefault();
        sendRequest.mutate({ username: search });
    };

    return (
        <>
            <div className="h-full p-4">
                <form onSubmit={submit}>
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                            <Search size={20} />
                        </div>
                        <input
                            type="search"
                            id="search"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
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
                <div className="flex h-full flex-col">
                    <p className="text-foreground mt-2 flex justify-center text-2xl">Your Friends</p>
                    <div className="tex-center h-full justify-center">
                        {getFriends.data && getFriends.data.data && getFriends.data.data.length > 0 ? (
                            getFriends.data.data.map((f: any) => {
                                return (
                                    <div key={f.id} className="bg-card hover:bg-accent/50 mt-2 flex items-center justify-between rounded-lg border p-3 transition-colors">
                                        <div className="flex items-center space-x-3">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={f.propic} alt={f.username} />
                                                <AvatarFallback>{f.username.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex items-center">
                                                <p className="text-foreground font-semibold">{f.username}</p>
                                                {/* <p className="text-sm text-muted-foreground">@{f.username}</p> */}
                                            </div>
                                        </div>
                                        <div className="text-foreground flex w-full items-center justify-end px-5">{getTimeAgo(f.updatedAt)}</div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-foreground flex h-full justify-center text-center">You have no friends :)</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

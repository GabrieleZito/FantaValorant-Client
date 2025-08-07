import userAPI from "@/API/userAPI";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Check, X } from "lucide-react";
import { getTimeAgo } from "@/utils/timePassed";
import toast from "react-hot-toast";

export function Invites() {
    const queryClient = useQueryClient();
    const getFriendRequests = useQuery({
        queryKey: ["friendRequests"],
        queryFn: userAPI.getFriendRequests,
        retry: false,
    });
    //console.log(getFriendRequests.data);

    const acceptFriendRequest = useMutation({
        mutationFn: userAPI.acceptFriendRequest,
        mutationKey: ["acceptFriendRequest"],
        onSuccess: (data) => {
            console.log(data);
            toast.success("You have a new friend!", {
                duration: 3000,
            });
            queryClient.invalidateQueries(["friendRequests"]);
        },
        onError: (data) => {
            console.log(data);
            toast.error("Failed to accept friend request", {
                duration: 3000,
            });
        },
    });

    const handleAccept = (requestId) => {
        acceptFriendRequest.mutate(requestId);
    };

    const declineFriendRequest = useMutation({
        mutationFn: userAPI.declineFriendRequest,
        mutationKey: ["declineFriendrequest"],
        onSuccess: (data) => {
            console.log(data);
            toast.success("Friend request declined", { duration: 3000 });
        },
        onError: (data) => {
            console.log(data);
            toast.error("Failed to decline friend request", { duration: 3000 });
        },
    });

    const handleDecline = (requestId) => {
        declineFriendRequest.mutate(requestId);
    };

    return (
        <>
            <div className="h-full p-4">
                <div>
                    <p className="text-2xl text-foreground">Friend Requests</p>
                    <div className="py-2">
                        {getFriendRequests.data && getFriendRequests.data.length > 0 ? (
                            getFriendRequests.data.map((f) => (
                                <div
                                    key={f.id}
                                    className="flex items-center justify-between p-3 mt-2 transition-colors border rounded-lg bg-card hover:bg-accent/50"
                                >
                                    <div className="flex items-center space-x-3">
                                        <Avatar className="w-10 h-10">
                                            <AvatarImage src={f.propic || "/placeholder.svg"} alt={f.Sender.username} />
                                            <AvatarFallback>{f.Sender.username.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex items-center">
                                            <p className="font-semibold text-foreground">{f.Sender.username}</p>
                                            {/* <p className="text-sm text-muted-foreground">@{f.username}</p> */}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-end w-full px-5 text-foreground">{getTimeAgo(f.createdAt)}</div>
                                    <div className="flex space-x-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleDecline(f.id)}
                                            className="hover:bg-destructive hover:text-destructive-foreground"
                                        >
                                            <X className="w-4 h-4" />
                                            <span className="sr-only">Decline</span>
                                        </Button>
                                        <Button size="sm" onClick={() => handleAccept(f.id)} className="text-white bg-green-600 hover:bg-green-700">
                                            <Check className="w-4 h-4" />
                                            <span className="sr-only">Accept</span>
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-foreground">You have no Friend requests</div>
                        )}
                    </div>
                </div>
                <div>
                    <p className="text-2xl text-foreground">Leaderboard Invites</p>
                </div>
            </div>
        </>
    );
}

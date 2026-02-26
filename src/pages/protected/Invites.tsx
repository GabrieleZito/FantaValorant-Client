import userAPI from "@/API/userAPI";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getTimeAgo } from "@/lib/timePassed";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, X } from "lucide-react";
import toast from "react-hot-toast";

export function Invites() {
    const queryClient = useQueryClient();

    const getFriendRequests = useQuery({
        queryKey: ["friendRequests"],
        queryFn: userAPI.getFriendRequests,
        retry: false,
    });

    const acceptFriendRequest = useMutation({
        mutationFn: userAPI.acceptFriendRequest,
        mutationKey: ["acceptFriendRequest"],
        onSuccess: (data) => {
            console.log(data);
            toast.success("You have a new friend!", {
                duration: 3000,
            });
            queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
        },
        onError: (data) => {
            console.log(data);
            toast.error("Failed to accept friend request", {
                duration: 3000,
            });
        },
    });
    const handleAccept = (requestId: number) => {
        acceptFriendRequest.mutate(requestId);
    };

    const declineFriendRequest = useMutation({
        mutationFn: userAPI.declineFriendRequest,
        mutationKey: ["declineFriendrequest"],
        onSuccess: (data) => {
            console.log(data);
            toast.success("Friend request declined", { duration: 3000 });
            queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
        },
        onError: (data) => {
            console.log(data);
            toast.error("Failed to decline friend request", { duration: 3000 });
        },
    });

    const handleDecline = (requestId: number) => {
        declineFriendRequest.mutate(requestId);
    };

    return (
        <div>
            <p className="text-foreground flex justify-center text-2xl">Friend Requests</p>
            <div className="py-2">
                {getFriendRequests.data?.data && getFriendRequests.data.data.length > 0 ? (
                    getFriendRequests.data.data.map((f) => (
                        <div key={f.id} className="bg-card hover:bg-accent/50 mt-2 flex items-center justify-between rounded-lg border p-3 transition-colors">
                            <div className="flex items-center space-x-3">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={f.Sender.propic} alt={f.Sender.username} />
                                    <AvatarFallback>{f.Sender.username.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex items-center">
                                    <p className="text-foreground font-semibold">{f.Sender.username}</p>
                                </div>
                            </div>
                            <div className="text-foreground flex w-full items-center justify-end px-5">{getTimeAgo(f.createdAt)}</div>
                            <div className="flex space-x-2">
                                <Button size="sm" variant="outline" onClick={() => handleDecline(f.id)} className="hover:bg-destructive hover:text-destructive-foreground">
                                    <X className="h-4 w-4" />
                                    <span className="sr-only">Decline</span>
                                </Button>
                                <Button size="sm" onClick={() => handleAccept(f.id)} className="bg-green-600 text-white hover:bg-green-700">
                                    <Check className="h-4 w-4" />
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
    );
}

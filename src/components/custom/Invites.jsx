import userAPI from "@/API/userAPI";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Check, X } from "lucide-react";
import { getTimeAgo } from "@/utils/timePassed";
import toast from "react-hot-toast";

export function Invites() {
    const queryClient = useQueryClient();

    const getInvites = useQuery({
        queryKey: ["invites"],
        queryFn: userAPI.getInvites,
    });

    const handleDecline = (inviteId) => {
        declineInvite.mutate(inviteId);
    };

    const handleAccept = (inviteId) => {
        acceptInvite.mutate(inviteId);
    };

    const acceptInvite = useMutation({
        mutationFn: userAPI.acceptInvite,
        mutationKey: ["acceptInvite"],
        onSuccess: (data) => {
            console.log(data);
            toast.success("Invite accepted", { position: "top-center" });
            queryClient.invalidateQueries(["invites"]);
        },
        onError: (data) => {
            console.log(data);
            toast.error("Something went wrong", { position: "top-center" });
        },
    });

    const declineInvite = useMutation({
        mutationFn: userAPI.declineInvite,
        mutationKey: ["declineInvite"],
        onSuccess: (data) => {
            console.log(data);
            toast.success("Invite declined", { position: "top-center" });
            queryClient.invalidateQueries(["invites"]);
        },
        onError: (data) => {
            console.log(data);
            toast.error("Something went wrong", { position: "top-center" });
        },
    });

    if (getInvites.isSuccess) {
        const invites = getInvites.data.data;
        return (
            <div>
                <p className="flex justify-center text-2xl text-foreground">Invites</p>
                <div className="py-2">
                    {invites.length > 0 ? (
                        invites.map((f) => (
                            <div className="flex items-center justify-between p-3 mt-2 transition-colors border rounded-lg bg-card hover:bg-accent/50">
                                <div className="flex items-center space-x-3">
                                    <Avatar className="w-10 h-10">
                                        <AvatarImage src={f.Sender.propic} alt={f.Sender.username} />
                                        <AvatarFallback>{f.Sender.username.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex items-center w-70">
                                        {f.Sender.username} invited you to <div className="ml-1 font-semibold">{f.League.name}</div>
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
                        <div className="text-foreground">You have no Invites</div>
                    )}
                </div>
            </div>
        );
    }
}

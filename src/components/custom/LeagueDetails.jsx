import leaguesAPI from "@/API/leaguesAPI";
import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import { LoadingSpinnerMini } from "./LoadingSpinner";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { FriendInvite } from "./FriendInvite";
import { Ban } from "lucide-react";
import { useSocket } from "@/contexts/SocketContext";

export function LeagueDetails() {
    const queryClient = useQueryClient();
    const user = useSelector((state) => state.auth.user);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const { socket, isConnected } = useSocket();
    const [teamName, setTeamName] = useState("");
    useBreadcrumb(dispatch, location.pathname.substring(0, location.pathname.lastIndexOf("-")));

    const getLeagueDetails = useQuery({
        queryKey: ["leagueDetails"],
        queryFn: () => leaguesAPI.getLeagueDetails(params.leaguename),
        retry: false,
    });

    const createTeam = useMutation({
        mutationFn: leaguesAPI.createTeam,
        mutationKey: ["createTeam"],
        onSuccess: (data) => {
            console.log(data);
            toast.success("YEAH");
            queryClient.invalidateQueries(["leagueDetails"]);
        },
        onError: (data) => {
            console.log("Error: ", data);
            toast.error("Something went wrong", { position: "top-center" });
        },
    });

    const handleSubmitTeamName = (leagueId) => {
        console.log(teamName, leagueId);
        createTeam.mutate({ teamName: teamName, leagueId: leagueId });
    };

    const createAuction = useMutation({
        mutationFn: leaguesAPI.createAuction,
        mutationKey: ["createAuction"],
        onSuccess: (data) => {
            console.log(data);
            console.log("SUCCESS");
            queryClient.invalidateQueries(["leagueDetails"]);
            socket.emit("auction:create", { auction: data.data });
            navigate(location.pathname + "/auction");
        },
        onError: (data) => {
            console.log(data.response.data);
            toast.error("Something went wrong", { position: "top-center" });
        },
    });

    const handleCreateAuction = (leagueId) => {
        createAuction.mutate({ leagueId: leagueId });
    };

    const handleOpenAuction = () => {
        navigate(location.pathname + "/auction");
    };

    if (getLeagueDetails.isError) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-3xl">
                <Ban color="red" size={48} />
                You don't have access to this league
            </div>
        );
    }

    if (getLeagueDetails.isLoading) {
        return <LoadingSpinnerMini />;
    }

    if (getLeagueDetails.isSuccess) {
        const league = getLeagueDetails.data.data;
        console.log(league);
        const member = league.Members.filter((m) => m.id == user.id)[0];
        if (!member.Team) {
            return (
                <div className="flex flex-col items-center justify-center w-full px-5 pt-5">
                    <div>Insert your team name</div>
                    <div className="flex mt-4 space-x-2">
                        <Input placeholder="Team name" value={teamName} onChange={(e) => setTeamName(e.target.value)} className="w-100" />
                        <Button variant="outline" size="default" className="bg-transparent shrink-0" onClick={() => handleSubmitTeamName(league.id)}>
                            Confirm
                        </Button>
                    </div>
                </div>
            );
        }

        return (
            <div className="">
                <div className="flex justify-between p-3">
                    <div className="text-xl">{league.name}</div>
                    <div>
                        {league.Members.length} Member{league.Members.length > 1 ? "s" : ""}
                    </div>
                    <div>{league.isPublic ? "Public" : "Private"}</div>
                </div>
                {league.createdBy == user.id ? (
                    <div className="flex justify-between p-3">
                        {league.Auction ? (
                            <Button onClick={() => handleOpenAuction()} className="hover:cursor-pointer">
                                Open Auction
                            </Button>
                        ) : (
                            <Button onClick={() => handleCreateAuction(league.id)} className="hover:cursor-pointer">
                                Create Auction
                            </Button>
                        )}
                        <FriendInvite leagueId={league.id} />
                    </div>
                ) : (
                    <>
                        {league.Auction ? (
                            <div className="flex justify-between p-3">
                                <Button onClick={handleOpenAuction} className="hover:cursor-pointer">
                                    Open Auction
                                </Button>
                            </div>
                        ) : (
                            ""
                        )}
                    </>
                )}
                <div className="p-3">
                    {league.Members.map((m) => (
                        <div key={m.id} className="flex items-center justify-between p-2 shadow rounded-2xl">
                            <div className="flex items-center gap-2">
                                <img src={m.propic} className="h-10" />
                                <div className="text">{m.Team ? m.Team.name : "AAA"}</div>
                            </div>
                            <div className="flex items-center">{m.LeagueMembers.score}</div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

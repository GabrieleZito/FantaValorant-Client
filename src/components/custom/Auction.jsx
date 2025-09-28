import leaguesAPI from "@/API/leaguesAPI";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export function Auction() {
    const params = useParams();

    const getLeagueDetails = useQuery({
        queryKey: ["leagueDetails"],
        queryFn: () => leaguesAPI.getLeagueDetails(params.leaguename),
    });

    if (getLeagueDetails.isError) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-3xl">
                <Ban color="red" size={48} />
                You don't have access to this league
            </div>
        );
    }

    if (getLeagueDetails.isSuccess) {
        console.log(getLeagueDetails.data);
    }
    return "AUCTION";
}

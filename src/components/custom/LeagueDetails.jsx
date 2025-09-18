import leaguesAPI from "@/API/leaguesAPI";
import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router";

export function LeagueDetails() {
    const location = useLocation();
    const dispatch = useDispatch();
    const params = useParams();
    useBreadcrumb(dispatch, location.pathname.substring(0, location.pathname.lastIndexOf("-")));

    const getLeagueDetails = useQuery({
        queryKey: ["leagueDetails"],
        queryFn: () => leaguesAPI.getLeagueDetails(params.leaguename),
    });
    if (getLeagueDetails.isSuccess) {
        console.log(getLeagueDetails.data);
    }
    return getLeagueDetails.isSuccess ? console.log(getLeagueDetails.data) : "";
}

import tournamentsAPI from "@/API/tournamentsAPI";
import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { LoadingSpinner } from "./LoadingSpinner";

export function Dashboard() {
    const location = useLocation();
    const dispatch = useDispatch();
    useBreadcrumb(dispatch, location.pathname);

    const nextTournaments = useQuery({
        queryKey: ["nextTournaments"],
        queryFn: tournamentsAPI.getNextTournaments,
    });

    return (
        <>
            <div className="flex flex-col flex-1 h-full gap-4 p-4">
                <div className="grid gap-4 auto-rows-min md:grid-cols-3">
                    <div className="aspect-video rounded-xl bg-blue-200/50" />
                    <div className="aspect-video rounded-xl bg-blue-200/50" />
                    <div className="aspect-video rounded-xl bg-blue-200/50" />
                </div>
                <div className="grid min-h-[200px] flex-1 gap-4 md:grid-cols-2">
                    <div className="rounded-xl bg-blue-200/50">
                        <div className="p-3">
                            <div className="flex justify-center text-xl"> Next Tournaments</div>
                            {nextTournaments.isLoading ? (
                                <LoadingSpinner />
                            ) : nextTournaments.data.data ? (
                                Object.entries(nextTournaments.data.data).map(([series, tournaments], i) => <div key={i}>{series}</div>)
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    <div className="rounded-xl bg-blue-200/50"></div>
                </div>
            </div>
        </>
    );
}

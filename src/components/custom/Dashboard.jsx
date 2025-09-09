import tournamentsAPI from "@/API/tournamentsAPI";
import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { LoadingSpinner, LoadingSpinnerMini } from "./LoadingSpinner";

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
                <div className="grid max-h-[550px] min-h-[200px] gap-4 md:grid-cols-2">
                    <NextTournamentsCard nextTournaments={nextTournaments} />
                    <div className="rounded-xl bg-blue-200/50"></div>
                </div>
            </div>
        </>
    );
}

function NextTournamentsCard({ nextTournaments }) {
    const content = () => {
        if (nextTournaments.isLoading) {
            return (
                <div className="flex items-center justify-center h-32">
                    <LoadingSpinnerMini />
                </div>
            );
        }
        if (nextTournaments.isError) {
            return (
                <div className="flex items-center justify-center h-32">
                    <div className="text-center text-red-500">Error retrieving tournaments</div>
                </div>
            );
        }
        if (!nextTournaments.data?.data || Object.entries(nextTournaments.data.data).length === 0) {
            return (
                <div className="flex items-center justify-center h-32">
                    <div className="text-center text-gray-500">No tournaments</div>
                </div>
            );
        }
        return (
            <div className="space-y-3">
                {Object.entries(nextTournaments.data.data).map(([series, tournaments]) => (
                    <div key={series} className="p-3 rounded-lg bg-white/20">
                        <h3 className="font-semibold text-blue-800">{series ? series : "Other"}</h3>
                        <p className="text-sm text-blue-600">
                            {tournaments.length} tournament{tournaments.length !== 1 ? "s" : ""}
                        </p>
                        <div className="mt-2 space-y-1">
                            {tournaments.map((tournament, idx) => (
                                <div key={idx} className="flex flex-row justify-between p-2 text-xs rounded bg-white/30">
                                    <div>{tournament.name || "Unnamed"}</div> <div>Ends: {tournament.enddate}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="flex flex-col h-full overflow-hidden rounded-xl bg-blue-200/50">
            <div className="flex-shrink-0 p-3 border-b border-white/20">
                <div className="flex justify-center text-xl">Next Tournaments</div>
            </div>
            <div className="flex-1 p-3 overflow-y-auto">{content()}</div>
        </div>
    );
}

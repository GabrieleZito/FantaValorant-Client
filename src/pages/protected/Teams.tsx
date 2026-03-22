import esportAPI from "@/API/esportAPI";
import { LoadingSpinner } from "@/components/Loading";
import { useQuery } from "@tanstack/react-query";

export function Teams() {
    const getTeams = useQuery({
        queryKey: ["esportTeams"],
        queryFn: esportAPI.getTeams,
    });

    if (getTeams.isLoading) {
        return <LoadingSpinner />;
    }

    if (getTeams.isSuccess && getTeams.data) {
        console.log(getTeams.data.data);
        return (
            <>
                <div className="flex flex-wrap">
                    {Object.entries(getTeams.data.data).map(([nationality, teams]) => (
                        <div key={nationality}>
                            <h2>{nationality}</h2>
                            {teams.map((team) => (
                                <div key={team.id}>{team.name}</div>
                            ))}
                        </div>
                    ))}
                </div>
            </>
        );
    }
}

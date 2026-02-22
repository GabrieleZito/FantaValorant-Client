import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import { useLocation, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import extAPI from "@/API/extAPI";
import { useState } from "react";
import type { Agent } from "@/types/valAPITypes";

export function Agents() {
    const locator = useLocation();
    useBreadcrumb(locator.pathname);
    const navigate = useNavigate();

    const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
    const [detailPage, setDetailPage] = useState(1);

    const agents = useQuery({
        queryFn: extAPI.getAgents,
        queryKey: ["agents"],
    });

    return (
        agents.isSuccess && (
            <div className="flex h-[80vh] w-full flex-row p-3">
                <div className={`flex h-min flex-wrap justify-center bg-amber-50 transition-all duration-300 ${selectedAgent ? "w-2/3" : "w-full"} `}>
                    {agents.data.map((a) => (
                        <div key={a.uuid} className="h-min p-2 hover:scale-105 hover:cursor-pointer" onClick={() => setSelectedAgent(a)}>
                            <img className="h-30" src={a.displayIcon} alt={a.displayName} />
                        </div>
                    ))}
                </div>
                {selectedAgent && (
                    <div className="animate-in fade-in flex h-min w-1/3 flex-col rounded-xl bg-white p-6 shadow-lg duration-300">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="font-tungsten text-4xl">{selectedAgent.displayName}</h2>
                            <button
                                className="text-2xl font-bold text-red-500 hover:cursor-pointer"
                                onClick={() => {
                                    setSelectedAgent(null);
                                    setDetailPage(1);
                                }}
                            >
                                x
                            </button>
                        </div>

                        {detailPage === 1 ? (
                            <>
                                <div className="relative bg-gray-300">
                                    <img className="mx-auto mb-4 w-max" src={selectedAgent.fullPortrait} alt={selectedAgent.displayName} />
                                    <div className="absolute top-0 left-0 flex h-18 w-18 items-center justify-center rounded-4xl">
                                        <img className="top-0 left-0 w-16" src={selectedAgent.role.displayIcon} alt="overlay" />
                                    </div>
                                    <div className="absolute top-0 right-0">
                                        <button
                                            className="p-3 text-2xl hover:cursor-pointer"
                                            onClick={() => {
                                                navigate("/dashboard/agents/" + selectedAgent.displayName);
                                            }}
                                        >
                                            3D
                                        </button>
                                    </div>
                                </div>
                                <p className="mb-2 text-base text-gray-700">{selectedAgent.description || "No description available."}</p>
                            </>
                        ) : (
                            <>
                                <div className="mb-4 text-center">
                                    <h3 className="mb-2 text-xl font-bold text-blue-700">Abilities</h3>
                                    {selectedAgent.abilities && selectedAgent.abilities.length > 0 ? (
                                        <ul className="space-y-2">
                                            {selectedAgent.abilities.map((ab) => (
                                                <li key={ab.slot} className="rounded bg-gray-100 p-2 text-sm">
                                                    <span className="font-semibold text-blue-700">{ab.displayName}</span>: {ab.description}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <span className="text-gray-500">No abilities found.</span>
                                    )}
                                </div>
                            </>
                        )}
                        <div className="mb-4 flex justify-center gap-4">
                            <button
                                className={`rounded px-3 py-1 ${detailPage === 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                                disabled={detailPage === 1}
                                onClick={() => setDetailPage(1)}
                            >
                                Page 1
                            </button>
                            <button
                                className={`rounded px-3 py-1 ${detailPage === 2 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                                disabled={detailPage === 2}
                                onClick={() => setDetailPage(2)}
                            >
                                Page 2
                            </button>
                        </div>
                    </div>
                )}
            </div>
        )
    );
}

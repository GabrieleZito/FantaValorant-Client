import leaguesAPI from "@/API/leaguesAPI";
import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router";

export function MyLeagues() {
    const location = useLocation();
    const dispatch = useDispatch();
    useBreadcrumb(dispatch, location.pathname);

    const getUserLeagues = useQuery({
        queryKey: ["userLeagues"],
        queryFn: leaguesAPI.getUserLeagues,
    });
    //console.log(getUserLeagues.data.data);

    return (
        <>
            <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
                <div className="px-0 overflow-scroll">
                    <table className="w-full text-left table-auto min-w-max">
                        <thead>
                            <tr>
                                <th className="p-4 border-blue-gray-100 bg-blue-gray-50/50 border-y">
                                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">Name</p>
                                </th>
                                <th className="p-4 border-blue-gray-100 bg-blue-gray-50/50 border-y">
                                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                        Function
                                    </p>
                                </th>
                                <th className="p-4 border-blue-gray-100 bg-blue-gray-50/50 border-y">
                                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                        Status
                                    </p>
                                </th>
                                <th className="p-4 border-blue-gray-100 bg-blue-gray-50/50 border-y">
                                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                        Employed
                                    </p>
                                </th>
                                <th className="p-4 border-blue-gray-100 bg-blue-gray-50/50 border-y">
                                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70"></p>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {getUserLeagues.data && getUserLeagues.data.data && getUserLeagues.data.data.length > 0 ? (
                                getUserLeagues.data.data.map((l) => {
                                    return (
                                        <tr key={l.id}>
                                            <td className="p-4 border-b border-blue-gray-50">
                                                <div className="flex items-center gap-3">{l.name}</div>
                                            </td>
                                            <td className="p-4 border-b border-blue-gray-50">FIELD 1</td>
                                            <td className="p-4 border-b border-blue-gray-50">FIELD 2</td>
                                            <td className="p-4 border-b border-blue-gray-50">FIELD 3</td>
                                            <td className="p-4 border-b border-blue-gray-50">
                                                <Link to={`/dashboard/my-leagues/${l.name}-${l.isPublic ? "pub" : "priv"}`}>
                                                    <button
                                                        className="relative h-10 max-h-[40px] w-10 max-w-[40px] rounded-lg text-center align-middle font-sans text-xs font-medium text-gray-900 uppercase transition-all select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                                        type="button"
                                                    >
                                                        OPEN
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr></tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* <div className="flex items-center justify-between p-4 border-t border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">Page 1 of 10</p>
                    <div className="flex gap-2">
                        <button
                            className="rounded-lg border border-gray-900 px-4 py-2 text-center align-middle font-sans text-xs font-bold text-gray-900 uppercase transition-all select-none hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                        >
                            Previous
                        </button>
                        <button
                            className="rounded-lg border border-gray-900 px-4 py-2 text-center align-middle font-sans text-xs font-bold text-gray-900 uppercase transition-all select-none hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                        >
                            Next
                        </button>
                    </div>
                </div> */}
            </div>
        </>
    );
}

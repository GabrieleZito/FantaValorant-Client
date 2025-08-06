import { Search } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export function Friends() {
    const user = useSelector((state) => state.user);
    const [search, setSearch] = useState("");
    return (
        <>
            <div className="h-full p-4">
                <form onSubmit={() => {}}>
                    <div className="relative">
                        <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
                            <Search size={20} />
                        </div>
                        <input
                            type="search"
                            id="search"
                            className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 ps-10 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            placeholder="Username"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            className="absolute end-2.5 bottom-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={() => toast("Here is your toast.")}
                        >
                            Send Request
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

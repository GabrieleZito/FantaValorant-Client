import { Link } from "react-router";

//TODO fix mobile view
export function Home() {
    return (
        <>
            <div className="flex flex-col items-center justify-center gap-5 mr-50 w-fit">
                <Link to={"/sign-in"}>
                    <button className="px-8 py-3 text-xl tracking-wider text-white transition-colors bg-red-500 border shadow-sm font-valorant w-xl border-white/30 hover:cursor-pointer hover:bg-red-600">
                        START YOUR LEAGUE
                    </button>
                </Link>
                <button className="px-8 py-3 text-xl tracking-wider text-white transition-colors bg-red-500 border shadow-sm font-valorant w-xl border-white/30 hover:bg-red-600">
                    HOW IT WORKS
                </button>
            </div>
        </>
    );
}

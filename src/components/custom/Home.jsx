import { Link } from "react-router";

export function Home() {
    return (
        <>
            <div className="mr-50 flex w-fit flex-col items-center justify-center gap-5">
                <Link to={"/sign-in"}>
                    <button className="font-valorant w-xl border border-white/30 bg-red-500 px-8 py-3 text-xl tracking-wider text-white shadow-sm transition-colors hover:cursor-pointer hover:bg-red-600">
                        START YOUR LEAGUE
                    </button>
                </Link>
                <button className="font-valorant w-xl border border-white/30 bg-red-500 px-8 py-3 text-xl tracking-wider text-white shadow-sm transition-colors hover:bg-red-600">
                    HOW IT WORKS
                </button>
            </div>
        </>
    );
}

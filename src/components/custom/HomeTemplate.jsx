import homeScreen from "@/assets/imgs/home-screen.png";
import { Link, Outlet } from "react-router";
export function HomeTemplate() {
    return (
        <>
            <div className={`flex h-screen w-full justify-end bg-amber-200 bg-cover bg-no-repeat`} style={{ backgroundImage: `url(${homeScreen})` }}>
                <Outlet />
            </div>
        </>
    );
}

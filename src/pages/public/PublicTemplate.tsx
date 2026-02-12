import homeScreen from "@/assets/imgs/home-screen.webp";
import { Outlet } from "react-router";

export function PublicTemplate() {
    return (
        <>
            <div className="h-screen bg-no-repeat bg-cover" style={{ backgroundImage: `url(${homeScreen})` }}>
                <Outlet />
            </div>
        </>
    );
}

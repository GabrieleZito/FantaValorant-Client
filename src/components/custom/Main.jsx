import React, { useEffect } from "react";
import { SidebarApp } from "@/components/custom/SidebarApp";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Link, Outlet, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Sun, Moon } from "lucide-react";
import { switchTheme } from "@/redux/slices/themeSlice";
import { socket } from "@/utils/socket";
import { useBreadcrumb } from "@/hooks/useBreadcrumb";

//TODO rifare i colori per la dark mode
//TODO provare react-scan

export function Main() {
    const theme = useSelector((state) => state.theme.value);
    const user = useSelector((state) => state.auth.user);
    const location = useLocation();
    const dispatch = useDispatch();
    useBreadcrumb(dispatch, location.pathname);

    useEffect(() => {
        socket.connect();
        socket.emit("user:register", { userId: user.id, username: user.username });
        return () => socket.disconnect();
    }, [socket]);

    useEffect(() => {
        socket.on("user:registered", (data) => {});
    }, [socket]);

    const toggleTheme = () => {
        dispatch(switchTheme());
    };

    return (
        <>
            <SidebarProvider className={`${theme ? "dark" : ""}`}>
                <SidebarApp />
                <SidebarInset>
                    <header className="flex items-center h-12 gap-2 border-b shrink-0">
                        <div className="flex flex-row items-center justify-between w-full gap-2 px-3">
                            <div className="flex items-center">
                                <SidebarTrigger />
                                <Separator orientation="vertical" className="h-4 mr-2" />
                                {/* TODO: dinamiche breadcrumb */}
                                <DynamicBreadcrumbs />
                            </div>
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={toggleTheme}
                                    className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none ${theme ? "bg-indigo-600" : "bg-gray-200"} ${theme ? "focus:ring-offset-gray-800" : "focus:ring-offset-white"} `}
                                    aria-label={theme ? "Passa al tema chiaro" : "Passa al tema scuro"}
                                    role="switch"
                                    aria-checked={theme}
                                >
                                    <Sun
                                        className={`absolute left-2 h-3 w-3 transition-opacity duration-200 ${theme ? "text-white opacity-30" : "text-yellow-600 opacity-60"} `}
                                    />
                                    <Moon
                                        className={`absolute right-2 h-3 w-3 transition-opacity duration-200 ${theme ? "text-white opacity-60" : "text-gray-600 opacity-30"} `}
                                    />
                                    <span
                                        className={`z-10 inline-flex h-6 w-6 transform items-center justify-center rounded-full bg-white shadow-lg transition-all duration-200 ease-in-out ${theme ? "translate-x-9" : "translate-x-1"} `}
                                    >
                                        {theme ? <Moon className="w-3 h-3 text-indigo-600" /> : <Sun className="w-3 h-3 text-yellow-600" />}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </header>
                    {/* <ProtectedRoutes /> */}
                    <Outlet />
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}

function DynamicBreadcrumbs() {
    const breadcrumbs = useSelector((state) => state.breadcrumb.value);
    const strings = breadcrumbs.replaceAll("%20", " ").split("/");

    return (
        <>
            <Breadcrumb>
                <BreadcrumbList>
                    {strings.map((s, i) => {
                        if (s) {
                            const url = strings.slice(0, i + 1).join("/");
                            //console.log(url);

                            return (
                                <React.Fragment key={i}>
                                    <BreadcrumbItem className="hidden md:block">
                                        <Link to={url}>
                                            {s
                                                .split("-")
                                                .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                                .join(" ")}
                                        </Link>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className="hidden md:block" />
                                </React.Fragment>
                            );
                        }
                    })}
                </BreadcrumbList>
            </Breadcrumb>
        </>
    );
}

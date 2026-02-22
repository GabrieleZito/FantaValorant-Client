import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { selectTheme, switchTheme } from "@/redux/slices/themeSlice";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Moon, Sun } from "lucide-react";
import { Outlet, useLocation } from "react-router";
import { Separator } from "@/components/ui/separator";
import { SidebarApp } from "@/components/sidebar/SidebarApp";
import { DynamicBreadcrumbs } from "@/components/sidebar/DynamicBreadCrumbs";
import { useBreadcrumb } from "@/hooks/useBreadcrumb";

export function Main() {
    const theme = useAppSelector(selectTheme);
    const dispatch = useAppDispatch();
    const location = useLocation();
    useBreadcrumb(location.pathname);
    const toggleTheme = () => {
        dispatch(switchTheme());
    };

    return (
        <SidebarProvider className={`${theme ? "dark" : ""}`}>
            <SidebarApp />
            <SidebarInset>
                <header className="flex items-center h-12 gap-2 border-b shrink-0">
                    <div className="flex flex-row items-center justify-between w-full gap-2 px-3">
                        <div className="flex items-center">
                            <SidebarTrigger />
                            <Separator orientation="vertical" className="h-4 mr-2" />
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
                <Outlet />
            </SidebarInset>
        </SidebarProvider>
    );
}

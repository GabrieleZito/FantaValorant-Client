import React, { useEffect, useState } from "react";
import { SidebarApp } from "@/components/custom/SidebarApp";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ChevronDownIcon, ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { Link, Outlet, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import userAPI from "../../API/userAPI";
import { setUser } from "../../redux/slices/userSlice";
import { Sun, Moon } from "lucide-react";
import { switchTheme } from "@/redux/slices/themeSlice";

export function Main() {
    const user = useSelector((state) => state.user);
    const theme = useSelector((state) => state.theme.value);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const sendLogout = useMutation({
        mutationFn: userAPI.logout,
        mutationKey: ["logout"],
        onSuccess: () => {
            dispatch(setUser({}));
            navigate("/");
        },
        onError: (err) => {
            console.log(err);
        },
    });

    const logout = () => {
        sendLogout.mutate();
    };

    const toggleTheme = () => {
        dispatch(switchTheme());
    };

    useEffect(() => {
        console.log(theme);
    }, [theme]);
    //TODO aggiungere controllo su utente è loggato

    return (
        <>
            <SidebarProvider className={`${theme ? "dark" : ""}`}>
                <SidebarApp />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 border-b">
                        <div className="flex w-full flex-row items-center justify-between gap-2 px-3">
                            <div className="flex items-center">
                                <SidebarTrigger />
                                <Separator orientation="vertical" className="mr-2 h-4" />
                                {/* TODO: dinamiche breadcrumb */}
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        <BreadcrumbItem className="hidden md:block">
                                            <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator className="hidden md:block" />
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>Overview</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
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
                                        {theme ? <Moon className="h-3 w-3 text-indigo-600" /> : <Sun className="h-3 w-3 text-yellow-600" />}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </header>
                    {/* TODO: BODY */}
                    <Outlet />
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}

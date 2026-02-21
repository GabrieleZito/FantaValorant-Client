import { useAppSelector } from "@/hooks/reduxHooks";
import { selectIsAuthenticated } from "@/redux/slices/authSlice";
import type { ReactNode } from "react";
import { Navigate } from "react-router";

export function PublicRoutes({ children }: { children: ReactNode }) {
    const isAuth = useAppSelector(selectIsAuthenticated);
    if (isAuth) {
        return <Navigate to="/dashboard" replace />;
    }
    return children;
}

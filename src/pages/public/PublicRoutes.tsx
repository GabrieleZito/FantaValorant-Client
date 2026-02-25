import { LoadingSpinner } from "@/components/Loading";
import { useAppSelector } from "@/hooks/reduxHooks";
import { selectIsAuthenticated, selectAuthLoading } from "@/redux/slices/authSlice";
import type { ReactNode } from "react";
import { Navigate } from "react-router";

export function PublicRoutes({ children }: { children: ReactNode }) {
    const isAuth = useAppSelector(selectIsAuthenticated);
    const authLoading = useAppSelector(selectAuthLoading);
    if (authLoading) {
        return <LoadingSpinner />;
    }
    if (isAuth) {
        return <Navigate to="/dashboard" replace />;
    }
    return children;
}

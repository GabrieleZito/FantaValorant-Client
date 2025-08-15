import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

export function ProtectedRoutes() {
    const auth = useSelector((state) => state.auth);

    return auth.accessToken ? <Outlet /> : <Navigate to="/sign-in" />;
}

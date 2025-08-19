import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export function PublicRoutes({ children }) {
    const { isAuthenticated } = useSelector((state) => state.auth);

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

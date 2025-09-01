import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export function ProtectedRoutes({ children }) {
    const { isAuthenticated } = useSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/sign-in" replace />;
    }

    return children;
} 
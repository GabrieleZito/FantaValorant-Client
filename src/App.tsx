import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import { Home } from "./pages/public/Home";
import { SignIn } from "./pages/public/SignIn";
import { PublicTemplate } from "./pages/public/PublicTemplate";
import { Main } from "./pages/protected/Main";
import { Dashboard } from "./pages/protected/Dashboard";
import { Toaster } from "react-hot-toast";
import { Friends } from "./pages/protected/Friends";
import { Invites } from "./pages/protected/Invites";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { checkAuth, selectAuthLoading } from "./redux/slices/authSlice";
import { Agents } from "./pages/protected/Agents";
import { PublicRoutes } from "./pages/public/PublicRoutes";
import { ProtectedRoutes } from "./pages/protected/ProtectedRoutes";
import { AgentDetail } from "./pages/protected/AgentDetails";
import { LoadingSpinner } from "./components/Loading";
import { Account } from "./pages/protected/Account";

function App() {
    const dispatch = useAppDispatch();
    const authLoading = useAppSelector(selectAuthLoading);

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    if (authLoading) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        element={
                            <PublicRoutes>
                                <PublicTemplate />
                            </PublicRoutes>
                        }
                    >
                        <Route index element={<Home />} />
                        <Route path="/sign-in" element={<SignIn />} />
                    </Route>
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoutes>
                                <Main />
                            </ProtectedRoutes>
                        }
                    >
                        <Route index element={<Dashboard />} />
                        <Route path="friends" element={<Friends />} />
                        <Route path="invites" element={<Invites />} />
                        <Route path="agents" element={<Agents />} />
                        <Route path="agents/:name" element={<AgentDetail />} />
                        <Route path="new-league" />
                        <Route path="my-leagues" />
                        <Route path="account" element={<Account />} />
                    </Route>
                </Routes>
            </BrowserRouter>
            <Toaster position="top-right" />
        </>
    );
}

export default App;

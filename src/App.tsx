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
import { useAppDispatch } from "./hooks/reduxHooks";
import { checkAuth } from "./redux/slices/authSlice";
import { Agents } from "./pages/protected/Agents";
import { PublicRoutes } from "./pages/public/PublicRoutes";
import { ProtectedRoutes } from "./pages/protected/ProtectedRoutes";
import { AgentDetail } from "./pages/protected/AgentDetails";

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

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
                    </Route>
                </Routes>
            </BrowserRouter>
            <Toaster position="top-right" />
        </>
    );
}

export default App;

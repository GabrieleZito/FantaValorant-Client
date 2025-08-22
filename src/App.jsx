import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { HomeTemplate } from "./components/custom/HomeTemplate";
import { SignIn } from "./components/custom/SignIn";
import { Home } from "./components/custom/Home";
import { Dashboard } from "./components/custom/Dashboard";
import { Main } from "./components/custom/Main";
import { Friends } from "./components/custom/Friends";
import { Toaster } from "react-hot-toast";
import { Invites } from "./components/custom/Invites";
import { NewLeague } from "./components/custom/NewLeague";
import { MyLeagues } from "./components/custom/MyLeagues";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearToken, loginError, loginSuccess } from "./redux/slices/authSlice";
import authAPI from "./API/authAPI";
import { PublicRoutes } from "./components/custom/PublicRoutes";
import { ProtectedRoutes } from "./components/custom/ProtectedRoutes";
import { LoadingSpinner } from "./components/custom/LoadingSpinner";

function App() {
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.auth);
    useEffect(() => {
        const checkAuth = async () => {
            //console.log("DENTRO checkAUTH");

            try {
                const response = await authAPI.me();

                if (response.success) {
                    dispatch(loginSuccess(response.data));
                } else {
                    //console.error("dentro login error");
                    dispatch(loginError(""));
                }
            } catch (error) {
                //console.error("Error in check Auth: ", error);
                dispatch(loginError("Errore"));
                dispatch(clearToken());
            }
        };
        checkAuth();
    }, [dispatch]);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        element={
                            <PublicRoutes>
                                <HomeTemplate />
                            </PublicRoutes>
                        }
                    >
                        <Route index element={<Home />} />
                        <Route path="sign-in" element={<SignIn />} />
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
                        <Route path="new-league" element={<NewLeague />} />
                        <Route path="my-leagues" element={<MyLeagues />} />
                    </Route>
                </Routes>
            </BrowserRouter>
            <Toaster position="top-right" />
        </>
    );
}

export default App;

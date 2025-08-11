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
function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomeTemplate />}>
                        <Route index element={<Home />} />
                        <Route path="sign-in" element={<SignIn />} />
                    </Route>
                    <Route path="/dashboard" element={<Main />}>
                        <Route index element={<Dashboard />} />
                        <Route path="friends" element={<Friends />} />
                        <Route path="invites" element={<Invites />} />
                        <Route path="new-league" element={<NewLeague />} />
                    </Route>
                </Routes>
            </BrowserRouter>
            <Toaster position="top-right" />
        </>
    );
}

export default App;

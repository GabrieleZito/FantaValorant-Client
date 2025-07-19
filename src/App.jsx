import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { HomeTemplate } from "./components/custom/HomeTemplate";
import { SignIn } from "./components/custom/SignIn";
import { Home } from "./components/custom/Home";
import { Dashboard } from "./components/custom/Dashboard";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomeTemplate />}>
                        <Route index element={<Home />} />
                        <Route path="sign-in" element={<SignIn />} />
                    </Route>
                    <Route path="/dashboard">
                        <Route index element={<Dashboard />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { HomeTemplate } from "./components/custom/HomeTemplate";
import { SignIn } from "./components/custom/SignIn";
import { Home } from "./components/custom/Home";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomeTemplate />}>
                        <Route index element={<Home />} />
                        <Route path="sign-in" element={<SignIn />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;

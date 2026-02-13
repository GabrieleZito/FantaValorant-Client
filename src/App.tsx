import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import { PublicTemplate } from "./pages/public/PublicTemplate";
import { Home } from "./pages/public/Home";
import { SignIn } from "./pages/public/SignIn";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<PublicTemplate />}>
                        <Route index element={<Home />} />
                        <Route path="/sign-in" element={<SignIn />} />
                    </Route>
                    <Route path="/dashboard">
                        <Route index />
                        <Route path="friends" />
                        <Route path="invites" />
                        <Route path="new-league" />
                        <Route path="my-leagues" />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;

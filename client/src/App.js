import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import ProtectedLayout from "./layouts/ProtectedLayout/ProtectedLayout";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import NotFound from "./pages/NotFound/NotFound";
import LandingPage from "./pages/Landing Page/LandingPage";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import Stats from "./pages/Stats/Stats";
import "./styles/app.sass";
import AuthLayout from "./layouts/Auth/AuthLayout";
function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/auth" element={<AuthLayout />}>
                    <Route path="sign-up" element={<SignUp />} />
                    <Route path="sign-in" element={<SignIn />} />
                </Route>
                <Route path="/dashboard" element={<ProtectedLayout />}>
                    <Route index element={<Home />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="shop" element={<Shop />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="stats" element={<Stats />} />
                    {/* Handle other routes */}
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;

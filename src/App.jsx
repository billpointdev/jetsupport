import { BrowserRouter, Route, Routes  } from "react-router-dom";
import './App.css'
import Home from "./pages/landing-pages/home";
import ErrorPage from "./pages/landing-pages/error-page";
import Login from './pages/auth/login';
import Signup from './pages/auth/signup';
import MyAccount from "./components/profile-screens/my-account";
import MyNotificaitions from "./components/profile-screens/my-notifications";
import DeleteAccount from "./components/profile-screens/delete-account";
import HelpSupport from "./components/profile-screens/help-support";
import OtpPage from "./components/auth/OTP-Screen";
import SecurityPin from "./components/auth/SecurityPin";
import AvatarScreen from "./components/auth/AvatarScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/otp" element={<OtpPage />} />
        <Route exact path="/security-pin" element={<SecurityPin />} />
        <Route exact path="/set-avatar" element={<AvatarScreen />} />

        {/* Profile */}
        <Route exact path="/profile" element={<MyAccount />} />
        <Route exact path="/notifications" element={<MyNotificaitions />} />
        <Route exact path="/delete-account" element={<DeleteAccount />} />
        <Route exact path="/help-support" element={<HelpSupport />} />
        <Route exact path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App


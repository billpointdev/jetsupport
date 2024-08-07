import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/landing-pages/home";
import ErrorPage from "./pages/landing-pages/error-page";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import MyAccount from "./components/profile-screens/my-account";
import MyNotificaitions from "./components/profile-screens/my-notifications";
import DeleteAccount from "./components/profile-screens/delete-account";
import HelpSupport from "./components/profile-screens/help-support";
import OtpPage from "./components/auth/OTP-Screen";
import SecurityPin from "./components/auth/SecurityPin";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPinScreen from "./components/auth/ResetPinScreen";
import MultiStep from "./components/auth/shared/avatar-multistep/index.jsx";
import JetChat from "./pages/chat/index.jsx";
import ProtectedRoute from "./routing/ProtectedRoute.jsx";
import TwoFactorPage from "./pages/two-factor/page.jsx";
import useAutoLogout from "./components/profile-screens/hooks/useAutoLogout.jsx";

function App() {
  useAutoLogout();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes  */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/2FA" element={<TwoFactorPage />} />
        <Route exact path="/otp" element={<OtpPage />} />
        <Route exact path="/security-pin" element={<SecurityPin />} />
        <Route exact path="/set-avatar" element={<MultiStep />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route exact path="/reset-password" element={<ResetPinScreen />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route exact path="/profile" element={<MyAccount />} />
          <Route exact path="/notifications" element={<MyNotificaitions />} />
          <Route exact path="/delete-account" element={<DeleteAccount />} />
          <Route exact path="/help-support" element={<HelpSupport />} />
          <Route exact path="/chat" element={<JetChat />} />
        </Route>

        {/* Catch-All Route */}
        <Route exact path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import TwoFactorLayout from "./layout";
import { BiLock } from "react-icons/bi";
import { logOut, validatePin } from "../../features/auth/authActions";

const TwoFactorPage = () => {
  const [token, setToken] = useState("");
  const [error, setError] = useState(null);
  const [isVerifyLoading, setIsVerifyLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (!userInfo?.user) {
      navigate("/login");
    }
  }, [userInfo?.user, navigate]);

  const handleVerifyToken = async () => {
    setIsVerifyLoading(true);
    try {
      await dispatch(
        validatePin({ email: userInfo?.user?.email, security_pin: token })
      ).unwrap();
      navigate(`/chat`);
    } catch (err) {
      console.error("Error verifying token:", err.message);
      setError(err.message || "An error occurred while verifying the token.");
      setToken("");
      setRetryCount((prev) => prev + 1);
      if (retryCount >= 2) {
        await dispatch(logOut({})).unwrap();
        localStorage.removeItem("access_token");
        navigate("/login");
      }
    } finally {
      setIsVerifyLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
    }, 2000);
    return () => clearTimeout(timer);
  }, [error]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleVerifyToken();
    }
  };

  const renderContent = () => {
    if (userInfo?.user?.google2fa_enable === 0) {
      return (
        <div className="w-full flex items-center flex-col mt-4">
          <div className="bg-orange-300 rounded-full h-16 w-16 text-orange-700 items-center justify-center flex text-3xl">
            <BiLock />
          </div>
          <p className="mt-4 font-medium">
            Go to your mobile app and enable your 2FA
          </p>
          <p className="text-gray-400 font-medium">
            Your safety is our priority
          </p>
        </div>
      );
    }

    if (userInfo?.user?.google2fa_enable === 1) {
      return (
        <div className="w-full flex items-center flex-col">
          {error && (
            <div className="text-red-500 bg-red-200 w-full font-medium rounded-sm py-2 flex items-center justify-center text-sm mt-2">
              {error}
            </div>
          )}
          <p className="self-start mt-4 font-medium">
            Enter the code from your authenticator app
          </p>
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            onKeyDown={handleKeyDown} // Add this line
            className="border outline-none w-full mt-2 h-9 px-3 font-semibold text-md"
          />
          <button
            onClick={handleVerifyToken}
            className="bg-primary mt-3 rounded-sm text-white w-full flex items-center justify-center py-2 text-sm font-medium"
          >
            {isVerifyLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-gray-50 border-l-red-400 animate-spin rounded-full" />
                <p>Verifying...</p>
              </div>
            ) : (
              "Verify Token"
            )}
          </button>
        </div>
      );
    }

    return null;
  };

  return <TwoFactorLayout>{renderContent()}</TwoFactorLayout>;
};

export default TwoFactorPage;

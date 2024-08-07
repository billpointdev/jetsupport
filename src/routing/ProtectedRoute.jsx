import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const { isPinValidated } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo?.user) {
      navigate("/login");
    } else if (userInfo?.user?.user_type === "staff" && !isPinValidated) {
      navigate("/2FA");
    } else if (userInfo?.user?.user_type === "staff" && isPinValidated) {
      navigate("/chat");
    }
  }, [userInfo, isPinValidated, navigate]);

  if (!userInfo || (userInfo?.user?.user_type === "staff" && !isPinValidated)) {
    return null;
  }

  return <Outlet />;
};

export default ProtectedRoute;

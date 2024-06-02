import { useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  // const [redirect, setRedirect] = useState(false);
  // const isPinValidated = localStorage.getItem("isPinValidated")
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      // setRedirect( true );
      navigate("/login");
    }
  }, [userInfo]);

  // if (redirect) {
  //   // return isPinValidated ? (
  //   //   <Navigate to="/security-pin" state={{ fromLogin: true }} />
  //   // ) : (
  //     <Navigate to="/login" />
  //   // );
  // }

  if (!userInfo) {
    return (
      <div className="unauthorized">
        <h1>Unauthorized :(</h1>
        <span>
          <NavLink to="/login">Login</NavLink> to gain access
        </span>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;

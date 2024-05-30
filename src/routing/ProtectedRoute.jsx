import { useSelector } from "react-redux";
import { NavLink, Outlet, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

const ProtectedRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [redirect, setRedirect] = useState(false);
  

  // useEffect(() => {
  //   if (!userInfo || !isPinValidated) {
  //     const timer = setTimeout(() => {
  //       setRedirect(true);
  //     }, 1000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [userInfo, isPinValidated]);

  // if (redirect) {
  //   return isPinValidated ? (
  //     <Navigate to="/security-pin" state={{ fromLogin: true }} />
  //   ) : (
  //     <Navigate to="/login" />
  //   );
  // }
console.log(userInfo)
  if (!userInfo ) {
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

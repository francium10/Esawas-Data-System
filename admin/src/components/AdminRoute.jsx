import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace></Navigate>
  );
};

export default PrivateRoute;

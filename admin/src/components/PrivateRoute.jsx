import { useNavigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return userInfo ? <Outlet /> : <Navigate to="/login" replace></Navigate>;
};

export default PrivateRoute;

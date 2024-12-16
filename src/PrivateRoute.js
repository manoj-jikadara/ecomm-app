import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const reduxState = JSON.parse(localStorage.getItem("reduxState"));
  const isAuthenticated = reduxState?.auth?.isAuthenticated;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

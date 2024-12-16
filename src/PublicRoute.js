import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const reduxState = JSON.parse(localStorage.getItem("reduxState"));
  const isAuthenticated = reduxState?.auth?.isAuthenticated;
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

export default PublicRoute;

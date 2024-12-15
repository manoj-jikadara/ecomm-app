import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

export default PublicRoute;
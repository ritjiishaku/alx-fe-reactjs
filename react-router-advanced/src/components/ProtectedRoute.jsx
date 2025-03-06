import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
  return localStorage.getItem("auth") === "true"; // Simulated authentication check
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" />;
};

export default ProtectedRoute;

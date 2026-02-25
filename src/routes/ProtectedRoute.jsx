import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../MyContext";
import LoadingSpinner from "../components/LoadingSpinner";

const ProtectedRoute = ({ children }) => {
  const { accessToken, loading } = useContext(Context);

  if (loading) return <LoadingSpinner/>; 

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

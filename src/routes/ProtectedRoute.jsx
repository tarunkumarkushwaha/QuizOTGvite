import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../MyContext";

const ProtectedRoute = ({ children }) => {
  const { accessToken, loading } = useContext(Context);

  if (loading) return null; // NO spinner, NO remount

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

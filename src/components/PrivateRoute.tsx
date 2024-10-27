import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const { isAuthorized } = useAuth();
  
  if (!isAuthorized) return <Navigate to="/insert-card" replace />;
  return <Outlet />;
};

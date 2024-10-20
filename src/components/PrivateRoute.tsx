import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const { token } = useAuth();
  if (!token) return <Navigate to="/insert-card" replace />;
  return <Outlet />;
};

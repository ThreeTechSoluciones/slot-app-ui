import { Navigate, Outlet } from "react-router";
import useAuthentication from '../hooks/useAuthentication';

export function PrivateRoute() {
  const { isAuthenticated } = useAuthentication();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

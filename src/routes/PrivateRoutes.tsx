import { Navigate, Outlet } from "react-router";
import useAuthentication from '../hooks/useAuthentication';
import Header from "../components/header/header";

function PrivateLayout() {
  return (
    <>
      <Header />
      <main className="content">
        <Outlet />
      </main>
    </>
  );
}

export function PrivateRoute() {
  const { isAuthenticated } = useAuthentication();
  return isAuthenticated ? <PrivateLayout /> : <Navigate to="/login" replace />;
}

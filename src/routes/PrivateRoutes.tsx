import { Navigate, Outlet } from "react-router";
import useAuthentication from '../hooks/useAuthentication';
import Header from "../components/header/header";
import { MainContent } from "./PrivateRoutes.styles";

function PrivateLayout() {
  return (
    <>
      <Header />
      <MainContent>
        <Outlet />
      </MainContent>
    </>
  );
}

export function PrivateRoute() {
  const { isAuthenticated } = useAuthentication();
  return isAuthenticated ? <PrivateLayout /> : <Navigate to="/login" replace />;
}

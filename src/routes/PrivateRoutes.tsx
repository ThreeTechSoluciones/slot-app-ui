import { Navigate, Outlet } from 'react-router';
import useAuthentication from '../hooks/useAuthentication';
import Header from '../components/header/header';

function PrivateLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export function PrivateRoute() {
  const { isAuthenticated } = useAuthentication();
  return isAuthenticated ? <PrivateLayout /> : <Navigate to="/login" replace />;
}

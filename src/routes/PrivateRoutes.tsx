import { Navigate, Outlet } from 'react-router';
import useAuthentication from '../hooks/useAuthentication';
import Header from '../components/header/header';
import { PrivateContent } from '../App.styles';

function PrivateLayout() {
  return (
    <>
      <Header />
      <PrivateContent>
        <Outlet />
      </PrivateContent>
    </>
  );
}

export function PrivateRoute() {
  const { isAuthenticated } = useAuthentication();
  return isAuthenticated ? <PrivateLayout /> : <Navigate to="/login" replace />;
}

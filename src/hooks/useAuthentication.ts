import { useSelector } from 'react-redux';
import { store } from '../app/store/store';

const useAuthentication = () => {
  const user = useSelector((state: ReturnType<typeof store.getState>) => state.auth.user);
  if (!user) return { isAuthenticated: false };

  return {
    isAuthenticated: user.accessToken != null,
    userId: user.userId,
    accessToken: user.accessToken,
  };
};

export default useAuthentication;

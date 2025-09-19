import { useSelector } from "react-redux";
import { store } from "../app/store/store";

const useAuthentication = () => {
  const auth = useSelector((state: ReturnType<typeof store.getState>) => state.auth);
  if(!auth.user) return { isAuthenticated: false };

  return {
    isAuthenticated: auth.user.accessToken != null,
    userId: auth.user.userId,
    accessToken: auth.user.accessToken,
  };
};

export default useAuthentication;

import { useSigninMutation } from "../app/services/AuthService";

const useAuthentication = () => {
  const [, { data }] = useSigninMutation({ fixedCacheKey: "shared-auth" });
  // return { isAuthenticated: data?.accessToken != null, userId: data?.userId };
  return { isAuthenticated: true };
};

export default useAuthentication;

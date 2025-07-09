import { useSigninMutation } from "../app/services/AuthService";

const useAuthentication = () => {
  const [, { data }] = useSigninMutation({ fixedCacheKey: "shared-auth" });
  return { isAuthenticated: true, userId: data?.userId };
};

export default useAuthentication;

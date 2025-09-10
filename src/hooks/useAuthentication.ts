import { useSigninMutation } from "../app/services/AuthService";

const useAuthentication = () => {
  const [, { data }] = useSigninMutation({ fixedCacheKey: "shared-auth" });
  console.log('updating useAuth')
  if (!data) return { isAuthenticated: false };

  return {
    isAuthenticated: data.accessToken != null,
    userId: data.userId,
    accessToken: data.accessToken,
  };
};

export default useAuthentication;

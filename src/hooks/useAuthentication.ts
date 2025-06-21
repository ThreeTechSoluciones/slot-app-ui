import { useSigninMutation } from '../app/services/AuthService';

const useAuthentication = () => {
  const [ , { data } ] = useSigninMutation({ fixedCacheKey: 'shared-auth' })
  return { isAuthenticated: data?.accessToken != null, userId: data?.userId } 
}

export default useAuthentication
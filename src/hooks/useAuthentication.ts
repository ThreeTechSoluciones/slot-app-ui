import { useSigninMutation } from '../app/services/AuthService';

const useAuthentication = () => {
  const [ , { data } ] = useSigninMutation({ fixedCacheKey: 'shared-auth' })
  console.log('signinData', data)
  console.log('useAuth', { isAuthenticated: data?.accessToken != null, userId: data?.userId } )
  return { isAuthenticated: data?.accessToken != null, userId: data?.userId } 
}

export default useAuthentication
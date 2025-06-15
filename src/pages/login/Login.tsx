import './Login.css'
import Logo from '../../assets/Logo.png'
import PasswordIcon from '../../assets/password-icon.png'
import UserIcon from '../../assets/user-icon.png'
import ErrorIcon from '../../assets/error-icon.png'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginScheme } from './login.scheme'
import { useSigninMutation } from '../../app/services/AuthService'
import { encryptToBase64 } from '../../utils/Base64Utils'
import { useNavigate } from 'react-router'

function Login() {

  const [ signin ] = useSigninMutation({ fixedCacheKey: 'shared-auth' })
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginScheme),
  })

  const onSubmit = ({ username, password }: { username: string, password: string }) => {
    signin(encryptToBase64(`${username}:${password}`))
      .unwrap()
      .then(() => {
        navigate('/home')
      })
  } 

  return (
    <div className='login'>
      <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className='input-container'>
            <img 
              src={UserIcon}
              width={40}
              height={40}
            />
            <input 
              placeholder='Usuario'
              {...register("username")}
            />
          </div>
          {errors.username && (
            <div className='error-container'>
              <img src={ErrorIcon} width={30} height={30}/>
              <p className='error-message'>{errors.username.message}</p>
            </div>
          )}
        </div>
        <div>
          <div className='input-container'>
            <img 
              src={PasswordIcon}
              width={40}
              height={30}
            />
            <input 
              placeholder='Contraseña'
              {...register("password")}
            />
          </div>
          {errors.password && (
            <div className='error-container'>
              <img src={ErrorIcon} width={30} height={30}/>
              <p className='error-message'>{errors.password.message}</p>
            </div>
          )}
        </div>
        <button className='submit-button' type='submit'>Iniciar sesion</button>
      </form>
      <section className='login-image-container'>
        <img 
          src={Logo} 
          draggable="false"
        />
      </section>
    </div>
  )
}

export default Login;
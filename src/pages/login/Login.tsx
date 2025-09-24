import './Login.css'
import LogoCeci from '../../assets/Logo.png'
import PasswordIcon from '../../assets/password-icon.png'
import UserIcon from '../../assets/user-icon.png'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginScheme } from './login.scheme'
import { useSigninMutation } from '../../app/services/AuthService'
import { encryptToBase64 } from '../../utils/Base64Utils'
import { useNavigate } from 'react-router'
import { MainContainer,
        Logo,
        Title,
        Img,
        Form,
        Input,
        Button,
        Label,
        InputContainer
 } from './Login.styles'

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
    <MainContainer>
      <Title>BIENVENIDO DE NUEVO</Title>
       <Logo><img src={LogoCeci} alt="Logo" /></Logo>
      <Form>
      
          <Label>Usuario*</Label>
          <InputContainer>
           <Input placeholder="Usuario"></Input>
            <img src={UserIcon} width={"24"} height={"24"}></img>
          </InputContainer>
         
          
          <Label>Contraseña*</Label>
        <Input placeholder="Contraseña"></Input>
    
        
     
          <Button>Aceptar</Button>
        
      </Form>
    </MainContainer>
  )
    
}
export default Login;
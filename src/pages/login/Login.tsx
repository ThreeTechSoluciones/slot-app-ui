import LogoCeci from '../../assets/logoCeci.png';
import OpenEyeIcon from '../../assets/openEye-icon.png';
import ClosedEyeIcon from '../../assets/closeEye-icon.png';
import UserIcon from '../../assets/user-icon.svg';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginScheme } from './login.scheme';
import { useSigninMutation } from '../../app/services/AuthService';
import { encryptToBase64 } from '../../utils/Base64Utils';
import { useNavigate } from 'react-router';
import * as s from './Login.styles';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { ErrorMessage } from '../../components/error_message/ErrorMessage';
import { Calendario, RecuperarContraseña } from '../../routes/RoutesUtils';

function Login() {
  const [signin] = useSigninMutation({ fixedCacheKey: 'shared-auth' });
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginScheme),
  });

  const onSubmit = ({ username, password }: { username: string; password: string }) => {
    signin(encryptToBase64(`${username}:${password}`))
      .unwrap()
      .then(() => {
        navigate(Calendario);
        toast.success(`¡Bienvenido/a ${username}!`);
      });
  };

  const [showPassword, setShowPassword] = useState(false);

  const changePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <s.MainContainer>
      <s.Title>¡BIENVENIDO DE NUEVO!</s.Title>
      <s.Logo>
        <img src={LogoCeci} alt="Logo" />
      </s.Logo>
      <s.Form onSubmit={handleSubmit(onSubmit)}>
        <s.Label>Usuario</s.Label>
        <s.InputContainer>
          <s.Input placeholder="Usuario" {...register('username')}></s.Input>
          <s.Img
            src={UserIcon}
            width={'26'}
            height={'26'}
            style={{ filter: 'brightness(0)' }}
          ></s.Img>
        </s.InputContainer>
        <ErrorMessage error={errors.username} />
        <s.Label>Contraseña</s.Label>
        <s.InputContainer>
          <s.Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Contraseña"
            {...register('password')}
          ></s.Input>
          {showPassword ? (
            <s.Img
              $isInteractive={true}
              onClick={changePasswordVisibility}
              src={OpenEyeIcon}
              width={'24'}
              height={'24'}
            />
          ) : (
            <s.Img
              $isInteractive={true}
              onClick={changePasswordVisibility}
              src={ClosedEyeIcon}
              width={'24'}
              height={'24'}
            />
          )}
        </s.InputContainer>
        <ErrorMessage error={errors.password} />

        <s.Button type="submit">Aceptar</s.Button>
        <s.ForgotPasswordText onClick={() => navigate(RecuperarContraseña)}>
          ¿Olvidaste tu contraseña?
        </s.ForgotPasswordText>
      </s.Form>
    </s.MainContainer>
  );
}
export default Login;

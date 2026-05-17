import UserIcon from '../../assets/user-icon.svg';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginScheme } from './login.scheme';
import { useSigninMutation } from '../../app/services/AuthService';
import { encryptToBase64 } from '../../utils/Base64Utils';
import { useNavigate } from 'react-router';
import * as s from './Login.styles';
import toast from 'react-hot-toast';
import { ErrorMessage } from '../../components/error_message/ErrorMessage';
import { Calendario, RecuperarContraseña } from '../../routes/RoutesUtils';
import { PasswordInput } from '../../components/password_input/PasswordInput';
import { InputField } from '../../components/input_field/InputField';
import Button from '../../components/button/Button';
import { Logo } from '../../components/logo/Logo';

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

  return (
    <s.MainContainer>
      <s.Title>¡BIENVENIDO DE NUEVO!</s.Title>
      <Logo />
      <s.Form onSubmit={handleSubmit(onSubmit)}>
        <s.Label>Usuario</s.Label>
        <InputField
          placeholder="Usuario"
          registration={register('username')}
          icon={UserIcon}
          iconStyle={{ filter: 'brightness(0)', width: '18px', height: '18px' }}
        />
        <ErrorMessage error={errors.username} />
        <s.Label>Contraseña</s.Label>
        <PasswordInput placeholder="Contraseña" registration={register('password')} />
        <ErrorMessage error={errors.password} />
        <s.ButtonContainer>
          <Button type="submit" size="large">
            Aceptar
          </Button>
        </s.ButtonContainer>

        <s.ForgotPasswordText onClick={() => navigate(RecuperarContraseña)}>
          ¿Olvidaste tu contraseña?
        </s.ForgotPasswordText>
      </s.Form>
    </s.MainContainer>
  );
}
export default Login;

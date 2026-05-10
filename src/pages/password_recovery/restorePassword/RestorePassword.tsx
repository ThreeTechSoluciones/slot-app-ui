import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as s from './RestorePassword.styles';
import BackIcon from '../../../assets/back-circle-icon.svg';
import Button from '../../../components/button/Button';
import { useConfirmRestorePasswordMutation } from '../../../app/services/AuthService';
import { IniciarSesion } from '../../../routes/RoutesUtils';
import { useForm } from 'react-hook-form';
import { restorePasswordScheme } from './RestorePassword.scheme';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '../../../components/error_message/ErrorMessage';
import { PasswordInput } from '../../../components/password_input/PasswordInput';
import { Logo } from '../../../components/logo/Logo';
type FormData = {
  password: string;
  repeatedPassword: string;
};
function RestorePassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const username = location.state?.username;
  const token = location.state?.token;

  const [confirmRestorePassword] = useConfirmRestorePasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(restorePasswordScheme),
  });
  const onSubmit = ({ password, repeatedPassword }: FormData) => {
    if (!username || !token) {
      toast.error('Sesión inválida');
      navigate(IniciarSesion);
      return;
    }
    confirmRestorePassword({
      username,
      password,
      repeatedPassword,
      token,
    })
      .unwrap()
      .then(() => {
        toast.success('Contraseña actualizada correctamente');
        navigate(IniciarSesion);
      });
  };

  return (
    <s.MainContainer>
      <s.Header>
        <s.BackContainer onClick={() => navigate(-1)}>
          <img src={BackIcon} alt="Volver" />
          <p>Volver</p>
        </s.BackContainer>
      </s.Header>

      <s.Title>MODIFICAR CONTRASEÑA</s.Title>

      <Logo />

      <s.Form>
        <s.Label>Nueva contraseña</s.Label>
        <PasswordInput
          placeholder="Ingresar nueva contraseña"
          registration={register('password')}
        />
        <s.ErrorContainer>
          <ErrorMessage error={errors.password} />
        </s.ErrorContainer>

        <s.Label>Confirmar nueva contraseña</s.Label>
        <PasswordInput
          placeholder="Repetir nueva contraseña"
          registration={register('repeatedPassword')}
        />
        <s.ErrorContainer>
          <ErrorMessage error={errors.repeatedPassword} />
        </s.ErrorContainer>

        <Button onClick={handleSubmit(onSubmit)} size="large" fontsize="medium">
          Aceptar
        </Button>
      </s.Form>
    </s.MainContainer>
  );
}

export default RestorePassword;

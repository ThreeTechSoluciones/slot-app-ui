import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import * as s from './RestorePassword.styles';
import LogoCeci from '../../../assets/logoCeci.png';
import BackIcon from '../../../assets/back-icon.svg';
import OpenEyeIcon from '../../../assets/openEye-icon.png';
import ClosedEyeIcon from '../../../assets/closeEye-icon.png';
import Button from '../../../components/button/Button';
import { useConfirmRestorePasswordMutation } from '../../../app/services/AuthService';
import { IniciarSesion } from '../../../routes/RoutesUtils';
import { useForm } from 'react-hook-form';
import { restorePasswordScheme } from './RestorePassword.scheme';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '../../../components/error_message/ErrorMessage';
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

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatedPassword, setShowRepeatedPassword] = useState(false);
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

      <s.Logo>
        <img src={LogoCeci} alt="Logo" />
      </s.Logo>

      <s.Form>
        <s.Label>Nueva contraseña*</s.Label>

        <s.InputContainer>
          <s.Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Ingresar nueva contraseña"
            {...register('password')}
          />
          <s.Img
            src={showPassword ? OpenEyeIcon : ClosedEyeIcon}
            width="24"
            height="24"
            $isInteractive
            onClick={() => setShowPassword((prev) => !prev)}
          />
        </s.InputContainer>
        <s.ErrorContainer>
          <ErrorMessage error={errors.password} />
        </s.ErrorContainer>

        <s.Label>Confirmar nueva contraseña*</s.Label>
        <s.InputContainer>
          <s.Input
            type={showRepeatedPassword ? 'text' : 'password'}
            placeholder="Repetir nueva contraseña"
            {...register('repeatedPassword')}
          />
          <s.Img
            src={showRepeatedPassword ? OpenEyeIcon : ClosedEyeIcon}
            width="24"
            height="24"
            $isInteractive
            onClick={() => setShowRepeatedPassword((prev) => !prev)}
          />
        </s.InputContainer>
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

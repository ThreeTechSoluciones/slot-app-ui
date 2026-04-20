import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { usernameScheme } from './usernameStep.scheme';
import { ErrorMessage } from '../../../components/error_message/ErrorMessage';
import UserIcon from '../../../assets/user-icon.svg';
import LogoCeci from '../../../assets/logoCeci.png';
import BackIcon from '../../../assets/back-icon.svg';
import * as s from './UsernameStep.styles';
import Button from '../../../components/button/Button';
import { VerificarCodigo } from '../../../routes/RoutesUtils';
import { useRestorePasswordMutation } from '../../../app/services/AuthService';
import toast from 'react-hot-toast';

type UsernameForm = {
  username: string;
};
function UsernameStep() {
  const navigate = useNavigate();
  const [restorePassword] = useRestorePasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UsernameForm>({
    resolver: yupResolver(usernameScheme),
  });
  const handleSendCode = (username: string) => {
    restorePassword({ username })
      .unwrap()
      .then(() => {
        toast.success('Código enviado');
        navigate(VerificarCodigo, { state: { username } });
      });
  };
  return (
    <s.MainContainer>
      <s.Header>
        <s.BackContainer onClick={() => navigate(-1)}>
          <img src={BackIcon} alt="back-icon" />
          <p>Volver</p>
        </s.BackContainer>
      </s.Header>
      <s.FormContainer>
        <s.Title>MODIFICAR CONTRASEÑA</s.Title>

        <s.Logo>
          <img src={LogoCeci} alt="Logo" />
        </s.Logo>

        <s.Form onSubmit={handleSubmit((data) => handleSendCode(data.username))}>
          <s.Label>Usuario*</s.Label>

          <s.InputContainer>
            <s.Input placeholder="Ingrese su usuario" {...register('username')} />
            <s.Img src={UserIcon} width={'26'} height={'26'} style={{ filter: 'brightness(0)' }} />
          </s.InputContainer>

          <ErrorMessage error={errors.username} />

          <Button type="submit" size="large" fontsize="medium">
            Aceptar
          </Button>
        </s.Form>

        <s.VerificationCodeText>
          Se enviará un código de verificación a tu correo electrónico.
        </s.VerificationCodeText>
      </s.FormContainer>
    </s.MainContainer>
  );
}
export default UsernameStep;

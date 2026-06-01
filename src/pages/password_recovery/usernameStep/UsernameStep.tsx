import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { usernameScheme } from './usernameStep.scheme';
import { ErrorMessage } from '../../../components/error_message/ErrorMessage';
import UserIcon from '../../../assets/user-icon.svg';
import BackIcon from '../../../assets/arrow-circle-icon.svg';
import * as s from './UsernameStep.styles';
import Button from '../../../components/button/Button';
import { VerificarCodigo } from '../../../routes/RoutesUtils';
import { useRestorePasswordMutation } from '../../../app/services/AuthService';
import toast from 'react-hot-toast';
import { InputField } from '../../../components/input_field/InputField';
import { Logo } from '../../../components/logo/Logo';

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
      .then((res) => {
        toast.success('Código enviado');
        navigate(VerificarCodigo, { state: { username, email: res.email } });
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

        <Logo />

        <s.Form onSubmit={handleSubmit((data) => handleSendCode(data.username))}>
          <s.Label>Usuario</s.Label>
          <InputField
            placeholder="Ingrese su usuario"
            registration={register('username')}
            icon={UserIcon}
            iconStyle={{ filter: 'brightness(0)', width: '18px', height: '18px' }}
          />

          <s.ErrorContainer>
            <ErrorMessage error={errors.username} />
          </s.ErrorContainer>

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

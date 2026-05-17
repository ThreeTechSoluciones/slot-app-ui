import { useLocation, useNavigate } from 'react-router-dom';
import {
  useRestorePasswordMutation,
  useValidateTokenMutation,
} from '../../../app/services/AuthService';
import toast from 'react-hot-toast';
import * as s from './VerifyCode.styles';
import Button from '../../../components/button/Button';
import BackIcon from '../../../assets/back-icon.svg';
import MailIcon from '../../../assets/mail-icon.svg';
import OtpInput from '../../../components/otpInput/OtpInput';
import { useState } from 'react';
import { ModificarContraseña } from '../../../routes/RoutesUtils';
import { ResendTimer } from '../../../components/resend_timer/ResendTimer';
import { Logo } from '../../../components/logo/Logo';

function VerifyCode() {
  const navigate = useNavigate();
  const [validateToken] = useValidateTokenMutation();
  const [restorePassword] = useRestorePasswordMutation();
  const [token, setToken] = useState('');
  const location = useLocation();
  const username = location.state?.username;
  const email = location.state?.email;
  const handleVerifyCode = () => {
    validateToken({ token })
      .unwrap()
      .then(() => {
        toast.success('Código ingresado verificado');
        navigate(ModificarContraseña, {
          state: { username, token },
        });
      });
  };
  const handleResendCode = () => {
    restorePassword({ username })
      .unwrap()
      .then(() => {
        toast.success('Código reenviado');
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

      <s.Title>VERIFICAR CÓDIGO</s.Title>

      <Logo />

      <s.EmailContainer>
        <s.IconContainer>
          <img src={MailIcon} alt="mail" />
          <span>Código enviado a:</span>
        </s.IconContainer>

        {email && <strong>{email}</strong>}
      </s.EmailContainer>

      <s.OtpContainer>
        <s.Description>Ingrese el código de 6 dígitos</s.Description>
        <OtpInput onChange={setToken} />
      </s.OtpContainer>

      <Button onClick={handleVerifyCode} size="large" fontsize="medium">
        Aceptar
      </Button>

      <s.ResendCodeContainer>
        ¿No recibiste el código?
        <ResendTimer seconds={60} onResend={handleResendCode} />
      </s.ResendCodeContainer>
    </s.MainContainer>
  );
}

export default VerifyCode;

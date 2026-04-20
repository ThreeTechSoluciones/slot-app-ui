import { useLocation, useNavigate } from 'react-router-dom';
import {
  useRestorePasswordMutation,
  useValidateTokenMutation,
} from '../../../app/services/AuthService';
import toast from 'react-hot-toast';
import * as s from './VerifyCode.styles';
import Button from '../../../components/button/Button';
import LogoCeci from '../../../assets/logoCeci.png';
import BackIcon from '../../../assets/back-icon.svg';
import MailIcon from '../../../assets/mail-icon.svg';
import OtpInput from '../../../components/otpInput/OtpInput';
import { useState } from 'react';
import { ModificarContraseña } from '../../../routes/RoutesUtils';

function VerifyCode() {
  const navigate = useNavigate();
  const [validateToken] = useValidateTokenMutation();
  const [restorePassword] = useRestorePasswordMutation();
  const [token, setToken] = useState('');
  const [isResending, setIsResending] = useState(false);
  const location = useLocation();
  const username = location.state?.username;
  const handleVerifyCode = () => {
    if (token.length !== 6) {
      toast.error('El código debe tener 6 caracteres');
      return;
    }

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
    setIsResending(true);
    restorePassword({ username })
      .unwrap()
      .then(() => {
        toast.success('Código reenviado');
      })
      .finally(() => {
        setIsResending(false);
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

      <s.Logo>
        <img src={LogoCeci} alt="Logo" />
      </s.Logo>

      <s.EmailContainer>
        <s.IconContainer>
          <img src={MailIcon} alt="mail" />
          <span>Código enviado a:</span>
        </s.IconContainer>

        <strong>ceciboroni@gmail.com</strong>
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
        <s.ResendCode onClick={handleResendCode}>
          {isResending ? 'Enviando...' : 'Reenviar código'}
        </s.ResendCode>
      </s.ResendCodeContainer>
    </s.MainContainer>
  );
}

export default VerifyCode;

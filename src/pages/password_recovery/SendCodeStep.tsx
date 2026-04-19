import { useNavigate } from 'react-router';
import UsernameStep from './usernameStep/UsernameStep';
import toast from 'react-hot-toast';
import { useRestorePasswordMutation } from '../../app/services/AuthService';

function SendCodeStep() {
  const navigate = useNavigate();
  const [restorePassword] = useRestorePasswordMutation();

  const handleUsernameSubmit = (username: string) => {
    restorePassword({ username })
      .unwrap()
      .then(() => {
        toast.success('Código de verificación enviado');
        navigate('/reset-password', { state: { username } });
      });

    navigate('/reset-password');
  };

  return <UsernameStep onSubmit={handleUsernameSubmit} />;
}

export default SendCodeStep;

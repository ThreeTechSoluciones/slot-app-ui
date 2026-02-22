import ErrorIcon from '../../assets/error-icon.png';
import { ErrorText } from '../error_message/ErrorMessage.styles';

type ErrorMessageProps = {
  error?: {
    message?: string;
  };
};

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return (
    <>
      {error && (
        <ErrorText>
          <img src={ErrorIcon} alt="Error" width={15} height={15} />
          {error.message}
        </ErrorText>
      )}
    </>
  );
};

import ErrorIcon from "../../assets/error-icon.png";
import type { FieldError } from "react-hook-form";
import { ErrorMessageStyle} from "../error_message/ErrorMessage.styles";

type ErrorMessageProps = {
  error?: FieldError;
};

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return (
    <>
      {error && (
        <ErrorMessageStyle>
          <img src={ErrorIcon} alt="Error" width={15} height={15} />
          {error.message}
        </ErrorMessageStyle>
      )}
    </>
  );
};

import ErrorIcon from "../../assets/error-icon2.png";
import type { FieldError } from "react-hook-form";
import { ErrorMessageStyle} from "./ErrorMessage.styles"

type ErrorMessageProps = {
  error?: FieldError;
};

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return (
    <>
      {error && (
        <ErrorMessageStyle>
          <img src={ErrorIcon} alt="Error" width={20} height={20} />
          {error.message}
        </ErrorMessageStyle>
      )}
    </>
  );
};
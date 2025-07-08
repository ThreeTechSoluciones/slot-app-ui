import ErrorIcon from "../../assets/error-icon.png";
import type { FieldError } from "react-hook-form";

type ErrorMessageProps = {
  error?: FieldError;
};

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return (
    <>
      {error && (
        <div className="error-container">
          <img src={ErrorIcon} alt="Error" />
          <p className="error-message">{error.message}</p>
        </div>
      )}
    </>
  );
};

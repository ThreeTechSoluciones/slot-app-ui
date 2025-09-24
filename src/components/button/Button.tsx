import {
  StyledButton,
  ButtonContent,
  ButtonIcon,
  ButtonText,
} from "./Button.styles";
type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  size = "medium",
  variant = "primary",
  icon,
}) => {
  return (
    <StyledButton onClick={onClick} size={size} variant={variant}>
      <ButtonContent>
        {icon && <ButtonIcon>{icon}</ButtonIcon>}
        {children && <ButtonText>{children}</ButtonText>}
      </ButtonContent>
    </StyledButton>
  );
};

export default Button;

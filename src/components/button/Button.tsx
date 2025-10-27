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
  variant?: "primary" | "warning" | "success";
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
    <StyledButton onClick={onClick} $size={size} $variant={variant}>
      <ButtonContent>
        {children && <ButtonText>{children}</ButtonText>}
        {icon && <ButtonIcon>{icon}</ButtonIcon>}
      </ButtonContent>
    </StyledButton>
  );
};

export default Button;

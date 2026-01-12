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
  fontsize?: "small" | "medium" | "large";
  variant?: "primary" | "warning" | "success";
  icon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  size = "medium",
  fontsize = "small",
  variant = "primary",
  icon,
  type = "button",
}) => {
  return (
    <StyledButton onClick={onClick} $size={size} $variant={variant} type={type}>
      <ButtonContent>
        {children && <ButtonText $fontsize={fontsize}>{children}</ButtonText>}
        {icon && <ButtonIcon>{icon}</ButtonIcon>}
      </ButtonContent>
    </StyledButton>
  );
};

export default Button;

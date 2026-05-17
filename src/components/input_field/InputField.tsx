import * as s from './InputField.styles';

interface Props {
  type?: string;
  placeholder?: string;
  registration?: any;
  icon?: string;
  onIconClick?: () => void;
  isInteractiveIcon?: boolean;
  iconStyle?: React.CSSProperties;
}
export function InputField({
  type = 'text',
  placeholder,
  registration,
  icon,
  onIconClick,
  isInteractiveIcon = false,
  iconStyle,
}: Props) {
  return (
    <s.Container>
      <s.InputContainer>
        <s.Input autoFocus type={type} placeholder={placeholder} {...registration} />

        {icon && (
          <s.Img
            src={icon}
            $isInteractive={isInteractiveIcon}
            onClick={onIconClick}
            style={iconStyle}
          />
        )}
      </s.InputContainer>
    </s.Container>
  );
}

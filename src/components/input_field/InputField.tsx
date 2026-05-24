import * as s from './InputField.styles';

interface Props {
  type?: string;
  placeholder?: string;
  registration?: any;
  icon?: string;
  onIconClick?: () => void;
  isInteractiveIcon?: boolean;
  iconStyle?: React.CSSProperties;
  hasAutofocus?: boolean;
}
export function InputField({
  type = 'text',
  placeholder,
  registration,
  icon,
  onIconClick,
  isInteractiveIcon = false,
  iconStyle,
  hasAutofocus = false
}: Props) {
  return (
    <s.Container>
      <s.InputContainer>
        <s.Input autoFocus={hasAutofocus} type={type} placeholder={placeholder} {...registration} />
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

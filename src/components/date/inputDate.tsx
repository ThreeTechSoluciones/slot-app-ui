import DatePicker from 'react-date-picker';
import { StyledWrapper } from './inputDate.styles';

interface InputDateProps extends React.ComponentProps<typeof DatePicker> {
  calendarPosition?: 'bottom' | 'top';
  width?: string;
  autoFocus?: boolean;
  style?: React.CSSProperties;
}
export default function InputDate({
  calendarPosition = 'bottom',
  width = '100%',
  style,
  autoFocus,
  ...props
}: InputDateProps) {
  return (
    <StyledWrapper $calendarPosition={calendarPosition} $width={width} style={style} $autoFocus={autoFocus}>
      <DatePicker {...props} />
    </StyledWrapper>
  );
}

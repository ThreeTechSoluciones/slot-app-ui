import * as s from './Spinner.styles';
import { BRAND_COLOR, NEUTRAL_COLOR } from '../../utils/Stylesheet';

interface SpinnerProps {
  size?: number;
  color?: string;
  text?: string;
}

const Spinner = ({ size = 14, color = BRAND_COLOR, text }: SpinnerProps) => {
  return (
    <s.SpinnerWrapper>
      <s.SpinnerCircle size={size} color={color} />
      {text && <span style={{ fontSize: '12px', color: NEUTRAL_COLOR }}>{text}</span>}
    </s.SpinnerWrapper>
  );
};

export default Spinner;

import * as s from './Spinner.styles';
import { BRAND_COLOR, NEUTRAL_COLOR } from '../../utils/Stylesheet';

interface SpinnerProps {
  size?: number;
  color?: string;
  text?: string;
  fontSize?: number;
}

const Spinner = ({ size = 14, color = BRAND_COLOR, text, fontSize = 12 }: SpinnerProps) => {
  return (
    <s.SpinnerWrapper>
      <s.SpinnerCircle size={size} color={color} />
      {text && (
        <span style={{ fontSize: `${fontSize}px`, color: NEUTRAL_COLOR, whiteSpace: 'nowrap' }}>
          {text}
        </span>
      )}
    </s.SpinnerWrapper>
  );
};

export default Spinner;

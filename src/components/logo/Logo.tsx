import * as s from './Logo.styles';
import LogoCeci from '../../assets/logoCeci.png';

interface Props {
  size?: number;
}

export function Logo({ size = 120 }: Props) {
  return (
    <s.Container $size={size}>
      <img src={LogoCeci} alt="Logo" />
    </s.Container>
  );
}

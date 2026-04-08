import styled from 'styled-components';
import { FOCUS_STYLE } from '../../utils/Stylesheet';

interface NumberInputProps {
  autoFocus?: boolean;
}

export const NumberInput = styled.input <NumberInputProps>`
  /* Para Chrome, Edge y Safari */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /* Para Firefox */
  appearance: textfield;
 ${({ autoFocus }) => autoFocus && `
    &:focus {
      ${FOCUS_STYLE}
    }
  `}
`;

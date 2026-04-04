import styled from 'styled-components';
import { FOCUS_STYLE } from '../../utils/Stylesheet';

export const NumberInput = styled.input`
  /* Para Chrome, Edge y Safari */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /* Para Firefox */
  appearance: textfield;
  &:focus {
    ${FOCUS_STYLE};
  }
`;

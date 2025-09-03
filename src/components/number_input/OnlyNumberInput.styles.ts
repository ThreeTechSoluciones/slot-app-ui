import styled from "styled-components";

export const NumberInput = styled.input`
  /* Para Chrome, Edge y Safari */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Para Firefox */
  appearance: textfield;
  -moz-appearance: textfield;
`;

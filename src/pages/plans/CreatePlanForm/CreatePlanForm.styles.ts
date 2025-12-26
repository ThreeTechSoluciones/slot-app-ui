import styled from "styled-components";
import {
  BORDER_RADIUS,
  TEXT_COLOR,
  FONT_WEIGHT_BOLD,
} from "../../../utils/Stylesheet";
export const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
`;
export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 36px;
  margin-right: 36px;
  padding: 8px;
  gap: 4px;
`;
export const LabelStyle = styled.label`
  text-align: left;
  font-weight: ${FONT_WEIGHT_BOLD};
`;
export const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
export const InputStyle = styled.input`
  border-radius: ${BORDER_RADIUS};
  width: 400px;
  height: 50px;
  align-items: center;

  border: 1.5px solid ${TEXT_COLOR};
  padding: 0 12px;
  &[type="number"] {
    -moz-appearance: textfield;
    appearance: none;
  }
  &[type="number"]::-webkit-inner-spin-button,
  &[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
`;
export const NumberInputContainer = styled.div`
  position: relative;
  display: inline-block;
  justify-content: center;
`;
export const SpinButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
`;

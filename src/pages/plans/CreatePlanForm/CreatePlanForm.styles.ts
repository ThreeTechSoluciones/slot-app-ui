import styled from "styled-components";
import {
  BORDER_RADIUS,
  DEFAULT_TEXT_COLOR,
  FONT_WEIGHT_BOLD,
  FONT_FAMILY,
  BACKGROUND_COLOR,
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
  box-sizing: border-box;
`;
export const LabelStyle = styled.label`
  text-align: left;
  font-weight: ${FONT_WEIGHT_BOLD};
  font-size: 16px;
`;
export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 400px;
  width: 100%;
`;
export const InputStyle = styled.input`
  border-radius: ${BORDER_RADIUS};
  width: 100%;
  height: 50px;
  align-items: center;
  font-family: ${FONT_FAMILY};
  border: 1.5px solid ${DEFAULT_TEXT_COLOR};
  padding: 0 12px;
  box-sizing: border-box;
  &[type="number"] {
    -moz-appearance: textfield;
    appearance: none;
  }
  &[type="number"]::-webkit-inner-spin-button,
  &[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
  background-color: ${BACKGROUND_COLOR};
  color: ${DEFAULT_TEXT_COLOR};
`;
export const NumberInputContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  max-width: 400px;
  flex-direction: column;
  margin-bottom: 10px;
`;
export const InputFieldWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
`;
export const ErrorWrapper = styled.div`
  margin-top: 2px;
  height: 8px;
`;
export const SpinButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  z-index: 2;
`;

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
  justify-content:center;
  text-align:center;
  width: 408px;
  height: auto;
  gap:20px;
  margin-left:35px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
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
 
`;

export const InputStyle = styled.input`
  border-radius: ${BORDER_RADIUS};
  width: 100%;
  height: 56px;
  align-items: center;
  font-family: ${FONT_FAMILY};
  border: 1.5px solid ${DEFAULT_TEXT_COLOR};
  padding: 0 12px;
  box-sizing: border-box;
  background-color: ${BACKGROUND_COLOR};
  color: ${DEFAULT_TEXT_COLOR};
  &::placeholder {
    font-size:12px;
  }
`;

export const NumberInputContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  max-width: 400px;
  flex-direction: column;
`;



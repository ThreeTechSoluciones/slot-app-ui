import styled from "styled-components";
import {
  BORDER_RADIUS,
  FONT_FAMILY,
  LIGHT_NEUTRAL_COLOR,
  DEFAULT_TEXT_COLOR,
  FONT_WEIGHT_BOLD,
  BACKGROUND_COLOR,
} from "../../../utils/Stylesheet";

export const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;
  padding: 0 36px;
  box-sizing: border-box;
  margin:0px;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const InputContainer = styled.div`
  display:flex;
  flex-direction:column;
  gap:4px;
`;

interface InputProps {
  $isNonEditable?: boolean;
}

export const Input = styled.input <InputProps>`
  border-radius: ${BORDER_RADIUS};
  height: 56px;
  width: 100%;
  box-sizing: border-box;
  padding: 0 12px;
  font-family: ${FONT_FAMILY};
  font-size: 16px;
  color: ${DEFAULT_TEXT_COLOR};
  background-color: ${BACKGROUND_COLOR};
  background-color: ${(props) => (props.$isNonEditable ? LIGHT_NEUTRAL_COLOR : BACKGROUND_COLOR)};
  border: ${(props) => props.$isNonEditable ? `2px solid ${LIGHT_NEUTRAL_COLOR}` : `1px solid ${DEFAULT_TEXT_COLOR}`};
  pointer-events: ${(props) => (props.$isNonEditable ? "none" : "auto")};
  `;

export const InputWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
`;

export const Label = styled.label`
  text-align: left;
  white-space: nowrap;
  font-size: 16px;
  font-weight: ${FONT_WEIGHT_BOLD};
  margin:1px 0px 1px 0px;
   
`;

export const EditPriceOptionContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top:6px;
`;

export const Description = styled.span`
  font-size: 12px;
  color: ${DEFAULT_TEXT_COLOR};
`;

export const DatePickerCustomWrapper = styled.div`
  width: 100%;
  .react-date-picker__wrapper {
    width: 200px !important;
    height: 56px !important;
    border: 1.5px solid ${DEFAULT_TEXT_COLOR} !important;
    border-radius: ${BORDER_RADIUS} !important;
    box-sizing: border-box !important;
  }
  .react-calendar {
    max-width: 90vw !important;
  }
`;

export const EditPriceInputs = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  margin-top: 12px;
  align-items: flex-start;
`;
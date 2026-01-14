import styled from "styled-components";
import {
  BORDER_RADIUS,
  FONT_FAMILY,
  LIGHT_NEUTRAL_COLOR,
  DEFAULT_TEXT_COLOR,
  FONT_WEIGHT_BOLD,
} from "../../../utils/Stylesheet";
export const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;
  padding: 0 36px;
  box-sizing: border-box;
`;
export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`;

export const InfoStyle = styled.div`
  width: 100%;
`;

export const InputStyle = styled.input`
  border-radius: ${BORDER_RADIUS};
  height: 50px;
  width: 100%;
  box-sizing: border-box;
  border: 1.5px solid ${DEFAULT_TEXT_COLOR};
  padding: 0 12px;
  font-family: ${FONT_FAMILY};
  &[type="number"] {
    -moz-appearance: textfield;
    appearance: none;
  }
  &[type="number"]::-webkit-inner-spin-button,
  &[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
`;
export const InfoValue = styled(InputStyle)`
  cursor: not-allowed;
  background-color: ${LIGHT_NEUTRAL_COLOR};
  pointer-events: none;
`;
export const InputWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  position: relative;
`;
export const LabelStyle = styled.label`
  text-align: left;
  white-space: nowrap;
  font-size: 16px;
  font-weight: ${FONT_WEIGHT_BOLD};
`;
export const InputGroup = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: 8px;
`;
export const Description = styled.span`
  font-size: 12px;
  color: ${DEFAULT_TEXT_COLOR};
`;
export const DatePickerCustomWrapper = styled.div`
  width: 100%;
  .react-date-picker__wrapper {
    width: 200px !important;
    height: 50px !important;
    border: 1.5px solid ${DEFAULT_TEXT_COLOR} !important;
    border-radius: ${BORDER_RADIUS} !important;
    box-sizing: border-box !important;
  }

  .react-calendar {
    margin-top: 10px !important;
    margin-left: 0 !important;
  }
`;
export const ErrorWrapper = styled.div`
  margin-top: 4px;
  height: 25px;
`;
export const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  margin-top: 12px;
  align-items: flex-start;
`;

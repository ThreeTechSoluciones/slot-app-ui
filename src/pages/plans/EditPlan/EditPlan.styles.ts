import styled from "styled-components";
import {
  BORDER_RADIUS,
  SECONDARY_COLOR,
  TEXT_COLOR,
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
`;

export const InfoStyle = styled.div`
  width: 100%;
`;

export const InputStyle = styled.input`
  border-radius: ${BORDER_RADIUS};
  height: 50px;
  width: 100%;
  box-sizing: border-box;
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
export const InfoValue = styled(InputStyle)`
  cursor: not-allowed;
  background-color: ${SECONDARY_COLOR};
  pointer-events: none;
`;
export const InputWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;
export const LabelStyle = styled.label`
  text-align: left;
  white-space: nowrap;
  font-size: 16px;
`;
export const InputGroup = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;
export const Description = styled.span`
  font-size: 12px;
  color: ${TEXT_COLOR};
`;

export const RowContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  width: 100%;
  margin-top: 12px;
`;

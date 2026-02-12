import styled from "styled-components";
import Arrow from "../../../../assets/arrow.png";
import {
  LIGHT_NEUTRAL_COLOR,
  NEUTRAL_COLOR,
  DEFAULT_TEXT_COLOR,
  FONT_FAMILY,
} from "../../../../utils/Stylesheet";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
export const Label = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-top: 8px;
  margin-bottom: 8px;
  font-family: ${FONT_FAMILY};
`;
export const BaseStyle = styled.input`
  width: 410px;
  height: 56px;
  border: 1px solid black;
  border-radius: 10px;
  font-size: 12px;
  padding: 16px;
  background: none;
  box-sizing: border-box;
  color: ${DEFAULT_TEXT_COLOR};
  font-family: ${FONT_FAMILY};
  &::placeholder {
    color: ${NEUTRAL_COLOR};
  }
`;
export const Select = styled(BaseStyle).attrs({ as: "select" })`
  height: 56px;
  border-radius: 10px;
  border: 1px solid black;
  color: black;
  font-size: 12px;
  padding-left: 16px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: url(${Arrow}) no-repeat right 12px center;
  padding-right: 32px;
`;
interface InputProps {
  $isSmallSize?: boolean;
}
export const Input = styled(BaseStyle)<InputProps>`
  width: ${(props) => (props.$isSmallSize ? "196px" : "410px")};
  background: ${(props) => (props.disabled ? LIGHT_NEUTRAL_COLOR : "none")};
  border: ${(props) =>
    props.disabled ? LIGHT_NEUTRAL_COLOR : "1px solid black"};
  &::placeholder {
    color: ${(props) => (props.disabled ? LIGHT_NEUTRAL_COLOR : NEUTRAL_COLOR)};
  }
`;
export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface TextProps {
  $isRegister: boolean;
}

export const Text = styled.p<TextProps>`
  font-size: 12px;
  color: ${DEFAULT_TEXT_COLOR};
  font-family: ${FONT_FAMILY};
  margin-top: ${(props) => (props.$isRegister ? "8px" : "0px")};
  margin-bottom: ${(props) => (props.$isRegister ? "8px" : "0px")};
  width: 100%;
  max-width: 410px;
`;
export const SecondaryInputsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 18px;
  width: 410px;
`;

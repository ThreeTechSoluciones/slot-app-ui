import styled from "styled-components";
import Arrow from "../../../../assets/Arrow.png";
import {
  LIGHT_NEUTRAL_COLOR,
  NEUTRAL_COLOR,
  DEFAULT_TEXT_COLOR,
  FONT_FAMILY,
  BORDER_RADIUS,
  FONT_WEIGHT_BOLD,
} from "../../../../utils/Stylesheet";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const TitleContainer = styled.div`
  width: 100%;
  margin-left: 80px;
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-right: 80px;
  margin-top: 32px;
  font-family: ${FONT_FAMILY};
  font-weight: ${FONT_WEIGHT_BOLD};
`;
export const Label = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-top: 8px;
  margin-bottom: 8px;

  align-self: flex-start;
  padding: 0px;
  font-family: ${FONT_FAMILY};
`;
export const BaseStyle = styled.input`
  width: 392px;
  height: 56px;
  border: 1px solid ${DEFAULT_TEXT_COLOR};
  border-radius: ${BORDER_RADIUS};
  font-size: 12px;
  padding-left: 16px;
  background: none;
  color: ${DEFAULT_TEXT_COLOR};
  font-family: ${FONT_FAMILY};
  &::placeholder {
    color: ${NEUTRAL_COLOR};
  }
`;
export const FormContainer = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: fit-content;
  max-width: 900px;
  overflow-x: visible;
`;
export const Select = styled(BaseStyle).attrs({ as: "select" })`
  width: 410px;
  height: 56px;
  align-self: flex-start;
  border-radius: ${BORDER_RADIUS};
  border: 1px solid ${DEFAULT_TEXT_COLOR};
  color: ${DEFAULT_TEXT_COLOR};
  font-size: 12px;
  padding-left: 16px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: url(${Arrow}) no-repeat right 12px center;
  padding-right: 32px;
`;

export const Input = styled(BaseStyle)<{ disabled?: boolean }>`
  background: ${(props) => (props.disabled ? LIGHT_NEUTRAL_COLOR : "none")};
  border: ${(props) =>
    props.disabled ? LIGHT_NEUTRAL_COLOR : "1px solid black"};
  &::placeholder {
    color: ${(props) => (props.disabled ? LIGHT_NEUTRAL_COLOR : NEUTRAL_COLOR)};
  }
`;
export const InputsContainer = styled.div`
  display: flex;
  gap: 16px;
`;

export const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: auto;
  max-width: 900px;
`;

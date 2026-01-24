import styled from "styled-components";
import Arrow from "../../../../assets/Arrow.png";
import {
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
export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
export const PlanContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 810px;
`;

export const Label = styled.p`
  font-size: 16px;
  font-weight: ${FONT_WEIGHT_BOLD};
  margin-top: 8px;
  margin-bottom: 8px;
  padding: 0px;
  font-family: ${FONT_FAMILY};
`;

export const Select = styled.select`
  width: 410px;
  height: 56px;
  border-radius: ${BORDER_RADIUS};
  border: 1px solid ${DEFAULT_TEXT_COLOR};
  font-size: 12px;
  padding-left: 16px;
  padding-right: 32px;

  background: none;
  color: ${DEFAULT_TEXT_COLOR};
  font-family: ${FONT_FAMILY};

  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  background: url(${Arrow}) no-repeat right 12px center;

  &::placeholder {
    color: ${NEUTRAL_COLOR};
  }
`;

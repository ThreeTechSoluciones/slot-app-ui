import styled from "styled-components";
import {
  BORDER_RADIUS,
  FONT_FAMILY,
  LIGHT_NEUTRAL_COLOR,
  DEFAULT_TEXT_COLOR,
} from "../../utils/Stylesheet";

export const ShiftDetailContainer = styled.div`
  width: 620px;
  max-width: 620px;
  height: 130px;
  display: flex;
  flex-direction: column;
  border-radius: ${BORDER_RADIUS};
  gap: 16px;
  overflow-x: auto;
  justify-content: center;
  margin-left: 32px;
`;

export const ShiftContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  height: auto;
  min-width: max-content;
  max-width: 100%;
  overflow-x: auto;
`;
export const Shift = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${LIGHT_NEUTRAL_COLOR};
  color: ${DEFAULT_TEXT_COLOR};
  width: 120px;
  height: 56px;
  border-radius: ${BORDER_RADIUS};
  border: 1px solid ${LIGHT_NEUTRAL_COLOR};
  padding-top: 16px;
`;
interface TextProps {
  $isADay?: boolean;
}

export const Text = styled.p<TextProps>`
  margin: 0 0 0 16px;
  padding: 0px;
  font-family: ${FONT_FAMILY};
  font-size: ${(props) => (props.$isADay ? "16px" : "12px")};
`;

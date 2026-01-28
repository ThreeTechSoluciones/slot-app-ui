import styled from "styled-components";
import {
  BORDER_RADIUS,
  FONT_FAMILY,
  LIGHT_NEUTRAL_COLOR,
  DEFAULT_TEXT_COLOR,
} from "../../utils/Stylesheet";

export const ShiftContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  overflow-x: auto;
`;
export const Shift = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${LIGHT_NEUTRAL_COLOR};
  color: ${DEFAULT_TEXT_COLOR};
  height: 56px;
  min-width: 120px;
  border-radius: ${BORDER_RADIUS};
  border-left: 5px solid ${LIGHT_NEUTRAL_COLOR};
  border-bottom: 5px solid ${LIGHT_NEUTRAL_COLOR};
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

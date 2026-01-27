import styled from "styled-components";
import {
  BORDER_RADIUS,
  FONT_FAMILY,
  LIGHT_NEUTRAL_COLOR,
  DEFAULT_TEXT_COLOR,
} from "../../utils/Stylesheet";

export const ShiftDetailContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: ${BORDER_RADIUS};
  gap: 16px;
  justify-content: center;
  margin-left: 30px;
  margin-right: 30px;
  margin-top: 8px;
  margin-bottom: 8px;
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

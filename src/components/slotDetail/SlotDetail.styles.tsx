import styled from "styled-components";
import {
  BORDER_RADIUS,
  FONT_FAMILY,
  LIGHT_NEUTRAL_COLOR,
  DEFAULT_TEXT_COLOR,
  FONT_WEIGHT_BOLD,
} from "../../utils/Stylesheet";

export const SlotDetailContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: 191px;
  display: flex;
  flex-direction: column;
  border-radius: ${BORDER_RADIUS};
  gap: 16px;
  border-right: 5px solid ${LIGHT_NEUTRAL_COLOR};
  border-left: 5px solid ${LIGHT_NEUTRAL_COLOR};
  border-top: 5px solid ${LIGHT_NEUTRAL_COLOR};
  border-bottom: 5px solid ${LIGHT_NEUTRAL_COLOR};
  margin-top: 16px;
`;

export const MainTitle = styled.h2`
  font-family: ${FONT_FAMILY};
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 32px;
`;
export const SlotContainer = styled.div`
  display: flex;
  gap: 24px;
  overflow-x: auto;
  box-sizing: border-box;
  padding: 0 60px;
  padding-bottom: 20px;
`;
export const Slot = styled.div`
  flex: 1 0 180px;
  max-width: 130px;
  display: flex;
  flex-direction: column;
  background-color: ${LIGHT_NEUTRAL_COLOR};
  color: ${DEFAULT_TEXT_COLOR};
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
  font-weight: ${FONT_WEIGHT_BOLD};
  font-family: ${FONT_FAMILY};
  font-size: ${(props) => (props.$isADay ? "16px" : "12px")};
`;

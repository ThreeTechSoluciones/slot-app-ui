import styled from "styled-components";
import {
  BORDER_RADIUS,
  DANGER_COLOR,
  DEFAULT_TEXT_COLOR,
  FONT_FAMILY,
  FONT_WEIGHT_BOLD,
  LIGHT_NEUTRAL_COLOR,
  SUCCESS_COLOR,
} from "../../utils/Stylesheet";

export const MetricsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 24px;
  width: 100%;
  padding-left: 80px;
  box-sizing: border-box;
  overflow-x: hidden;
  flex-wrap: wrap;
`;

export const Card = styled.div<{ $borderColor: string }>`
  flex: 0 0 200px;
  min-height: 84px;
  background-color: ${LIGHT_NEUTRAL_COLOR};
  border-radius: ${BORDER_RADIUS};
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  margin-bottom: 20px;
  padding: 8px 16px;
  border-left: 5px solid ${({ $borderColor }) => $borderColor};
`;

export const Title = styled.span<{ $isSuccess?: boolean }>`
  font-size: 16px;
  color: ${({ $isSuccess }) => ($isSuccess ? SUCCESS_COLOR : DANGER_COLOR)};
  font-family: ${FONT_FAMILY};
  font-weight: ${FONT_WEIGHT_BOLD};
  margin-bottom: 2px;
`;

export const ValueContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  line-height: 1;
`;

export const Value = styled.span`
  font-size: 24px;
  color: ${DEFAULT_TEXT_COLOR};
  font-weight: ${FONT_WEIGHT_BOLD};
`;

export const IconWrapper = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $color }) => $color};
  font-size: 20px;
`;

export const Subtitle = styled.span`
  font-size: 12px;
  color: ${DEFAULT_TEXT_COLOR};
`;

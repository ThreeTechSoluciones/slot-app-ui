import styled from "styled-components";
import {
  BORDER_RADIUS,
  DEFAULT_TEXT_COLOR,
  FONT_WEIGHT_BOLD,
  LIGHT_NEUTRAL_COLOR,
} from "../../utils/Stylesheet";

export const MetricsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 24px;
  width: 100%;
  box-sizing: border-box;
  flex-wrap: wrap;
`;

export const Card = styled.div<{ $borderColor: string }>`
  max-width: 200px;
  width: 100%;
  min-height: 84px;
  background-color: ${LIGHT_NEUTRAL_COLOR};
  border-radius: ${BORDER_RADIUS};
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  padding: 8px 16px;
  border-left: 5px solid ${({ $borderColor }) => $borderColor};
`;

export const Title = styled.p<{ $color: string }>`
  font-size: 16px;
  color: ${({ $color }) => $color};
  font-weight: ${FONT_WEIGHT_BOLD};
  margin-bottom: 2px;
  margin: 0;
`;

export const ValueContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  line-height: 1;
`;

export const Value = styled.p`
  font-size: 24px;
  color: ${DEFAULT_TEXT_COLOR};
  font-weight: ${FONT_WEIGHT_BOLD};
  margin: 0;
`;

export const IconWrapper = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $color }) => $color};
  font-size: 20px;
`;

export const Description = styled.p`
  font-size: 12px;
  color: ${DEFAULT_TEXT_COLOR};
  margin: 0;
`;

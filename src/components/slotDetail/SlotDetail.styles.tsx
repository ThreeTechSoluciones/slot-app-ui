import styled from 'styled-components';
import {
  BORDER_RADIUS,
  LIGHT_NEUTRAL_COLOR,
  DEFAULT_TEXT_COLOR,
  FONT_WEIGHT_BOLD,
  DEFAULT_FONT_SIZE,
  SMALL_FONT_SIZE,
} from '../../utils/Stylesheet';

export const SlotContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  overflow-x: auto;
`;

export const Slot = styled.div`
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
  margin: 0 0 0 8px;
  padding: 0px;
  font-weight: ${FONT_WEIGHT_BOLD};
  font-size: ${(props) => (props.$isADay ? DEFAULT_FONT_SIZE : SMALL_FONT_SIZE)};
`;

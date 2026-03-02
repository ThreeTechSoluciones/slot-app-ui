import styled from 'styled-components';
import {
  BORDER_RADIUS,
  LIGHT_NEUTRAL_COLOR,
  SUCCESS_COLOR,
  NEUTRAL_COLOR,
  DEFAULT_TEXT_COLOR,
  FONT_WEIGHT_BOLD,
  BACKGROUND_COLOR,
  MEDIUM_FONT_SIZE,
  SMALL_FONT_SIZE,
} from '../../utils/Stylesheet';

interface HourProps {
  $isAvailable?: boolean;
}

export const MainContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 810px;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  margin-top: 32px;
  margin-bottom: 16px;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  gap: 16px;
  flex: 1;
  padding-bottom: 20px;
  align-items: center;
  border-right: 5px solid ${LIGHT_NEUTRAL_COLOR};
  border-bottom: 5px solid ${LIGHT_NEUTRAL_COLOR};
  &:first-child {
    border-left: 5px solid ${LIGHT_NEUTRAL_COLOR};
  }
`;

export const Day = styled.p`
  display: flex;
  height: 32px;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 0px;
  padding: 0px;
  font-size: ${MEDIUM_FONT_SIZE};
  font-weight: ${FONT_WEIGHT_BOLD};
  color: ${DEFAULT_TEXT_COLOR};
  background-color: ${LIGHT_NEUTRAL_COLOR};
`;
export const Hour = styled.button<HourProps>`
  display: flex;
  width: 80px;
  height: 32px;
  font-size: ${SMALL_FONT_SIZE};
  border-radius: ${BORDER_RADIUS};
  justify-content: center;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: ${DEFAULT_TEXT_COLOR};
  background-color: ${(props) => (props.$isAvailable ? BACKGROUND_COLOR : LIGHT_NEUTRAL_COLOR)};
  color: ${(props) => (props.$isAvailable ? `${DEFAULT_TEXT_COLOR}` : `${NEUTRAL_COLOR}`)};
  border: ${(props) =>
    props.$isAvailable ? `2px solid ${SUCCESS_COLOR}` : `2px solid ${LIGHT_NEUTRAL_COLOR}`};
  &:hover {
    cursor: ${(props) => (props.$isAvailable ? 'pointer' : 'default')};
  }
`;

export const WarningContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  border-right: 5px solid ${LIGHT_NEUTRAL_COLOR};
  border-top: 5px solid ${LIGHT_NEUTRAL_COLOR};
`;

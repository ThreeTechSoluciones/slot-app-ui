import styled from 'styled-components';
import {
  DEFAULT_FONT_SIZE,
  DEFAULT_TEXT_COLOR,
  FONT_WEIGHT_BOLD,
  LIGHT_NEUTRAL_COLOR,
  BRAND_COLOR,
  BACKGROUND_COLOR,
} from '../../utils/Stylesheet';

const ROW_HEIGHT = '260px';
const ROW_SPACING_HEIGHT = '16px';

export const MainContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 24px 0px 24px 0px;
  justify-content: center;
  padding: 0 24px;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  margin: 32px 0px 32px 0px;
`;

export const NoResponseContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin-top: 32px;
`;

export const Spacing = styled.div`
  margin-top: 132px;
`;

export const NavigationDateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 16px;
`;

export const InputDateContainer = styled.div`
  width: 408px;
`;

export const CustomDisplayContainer = styled.div`
  position: relative;
`;

export const CustomDisplay = styled.div`
  position: absolute;
  background-color: ${BACKGROUND_COLOR};
  font-weight: ${FONT_WEIGHT_BOLD};
  top: 8px;
  left: 16px;
  width: 345px;
  height: 40px;
  display: flex;
  align-items: center;
  z-index: 1;
`;

export const NavigationArrow = styled.div`
  display: flex;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${LIGHT_NEUTRAL_COLOR};
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
    background-color: ${BRAND_COLOR};
  }
`;

interface CalendarContainerProps {
  $columnsCount: number;
}

export const CalendarContainer = styled.div<CalendarContainerProps>`
  margin-top: 56px;
  display: grid;
  grid-template-columns: 85px repeat(${(props) => props.$columnsCount || 3}, minmax(204px, 300px));
`;

export const SpecificEmptySlot = styled.div`
  height: ${ROW_HEIGHT};
  border: ${LIGHT_NEUTRAL_COLOR};
  background-color: ${LIGHT_NEUTRAL_COLOR};
  border-radius: 8px;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 8px;
  box-sizing: border-box;
`;

export const DayColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${ROW_SPACING_HEIGHT};
  padding: 0 8px;
  max-width: 272px;
`;

export const DayContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const DayOfWeek = styled.h1`
  color: ${DEFAULT_TEXT_COLOR};
  font-weight: ${FONT_WEIGHT_BOLD};
  font-size: ${DEFAULT_FONT_SIZE};
`;

export interface NumberProps {
  $isCurrentDay?: boolean;
}

export const Number = styled.span<NumberProps>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${(props) => (props.$isCurrentDay ? BRAND_COLOR : LIGHT_NEUTRAL_COLOR)};
  font-weight: ${FONT_WEIGHT_BOLD};
  color: ${DEFAULT_TEXT_COLOR};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ScheduledTime = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${ROW_SPACING_HEIGHT};
  margin-top: 61px;
`;

export const TimeSlot = styled.p`
  font-weight: ${FONT_WEIGHT_BOLD};
  border-radius: 5px;
  color: ${DEFAULT_TEXT_COLOR};
  height: ${ROW_HEIGHT};
  width: 64px;
  background-color: ${LIGHT_NEUTRAL_COLOR};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0px;
`;

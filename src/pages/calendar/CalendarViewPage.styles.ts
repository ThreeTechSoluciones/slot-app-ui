import styled from "styled-components";
import {
  BRAND_COLOR,
  DANGER_COLOR,
  DEFAULT_FONT_SIZE,
  DEFAULT_TEXT_COLOR,
  FONT_FAMILY,
  FONT_WEIGHT_BOLD,
  LIGHT_NEUTRAL_COLOR,
  SUCCESS_COLOR,
  WARNING_COLOR
}
  from "../../utils/Stylesheet";

const ROW_HEIGHT = '260px';
const ROW_SPACING_HEIGHT = '16px'

export const NoResponseContainer = styled.div`
    display:flex;
    flex-direction: column;
    align-items:center;
    justify-content:center;
    margin-top:32px;
`
export const MainContainer = styled.div`
    display: flex;
    flex-direction:column;
    align-items:Center;
    margin:32px 0px 32px 0px;
    justify-content: center; 
    padding: 0 24px; 
`;

export const NavigationDateContainer = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  gap:16px
`
export const CustomDisplay = styled.div`
  position: absolute;
  background-color:white;
  font-family:${FONT_FAMILY};
  font-weight:${FONT_WEIGHT_BOLD};
  top: 8px;
  left: 16px;
  width: 180px;
  height: 40px;
  display: flex;
  align-items: center;
  z-index: 1000;
`;

export const NavigationArrow = styled.div`
  display:flex;
  width:32px;
  height:32px;
  border-radius:50%;
  background-color: ${LIGHT_NEUTRAL_COLOR};
  align-items:center;
  justify-content:center;
  &:hover {
    cursor:pointer;
    background-color: ${BRAND_COLOR}
  }
`
interface CalendarContainerProps {
  $columnsCount: number;
};

export const CalendarContainer = styled.div<CalendarContainerProps>`
    display:grid;
    grid-template-columns: 85px repeat(${(props) => props.$columnsCount || 3}, minmax(200px, 300px));
    margin-top:56px;
`;

export const DayColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap:${ROW_SPACING_HEIGHT};
    padding: 0 8px;
    max-width:272px;
`;

export const DayContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap:8px;
`;

export const DayOfWeek = styled.h1`
    font-family: ${FONT_FAMILY};
    color: ${DEFAULT_TEXT_COLOR};
    font-weight: ${FONT_WEIGHT_BOLD};
    font-size:${DEFAULT_FONT_SIZE};  
`;
export const Number = styled.span`
    width: 32px;          
    height: 32px;          
    border-radius: 50%;
    background-color: ${LIGHT_NEUTRAL_COLOR};
    font-weight: ${FONT_WEIGHT_BOLD};
    font-family: ${FONT_FAMILY};
    color: ${DEFAULT_TEXT_COLOR};
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ScheduledTime = styled.div`
    display: flex;
    flex-direction: column;
    gap:${ROW_SPACING_HEIGHT};
    margin-top: 61px;   
`;

export const TimeSlot = styled.p`
    font-family: ${FONT_FAMILY};
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

interface SpecificSlotProps {
  $isNull: boolean;
  $columnsCount: number;
}

export const SpecificSlot = styled.div<SpecificSlotProps>`
    height: ${ROW_HEIGHT};
    border: ${(props) => props.$isNull ? "none" : "4px solid " + LIGHT_NEUTRAL_COLOR};
    background-color: ${(props) => props.$isNull ? LIGHT_NEUTRAL_COLOR : "transparent"};
    border-radius: 8px;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden; 
    padding: 8px;
    box-sizing: border-box;
`;

export const ActionsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
   
`;

export const Action = styled.button`
    padding: 4px 8px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
`;

export const SlotInfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
    margin-top: 16px;
    
`;

interface SlotInfoProps {
  $isFull?: boolean,
  $status?: string
};

export const SlotInfo = styled.span<SlotInfoProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: white;
    font-family: ${FONT_FAMILY};
    font-weight: ${FONT_WEIGHT_BOLD};
    border-radius: 5px;
    padding: 2px 6px 2px 4px;
    margin-left:2px;
`;

export const SlotCapacity = styled(SlotInfo) <SlotInfoProps>`
    background-color: ${(props) => props.$isFull ? DANGER_COLOR : SUCCESS_COLOR};
`;

export const SlotStatus = styled(SlotInfo) <SlotInfoProps>`
   background-color: ${({ $status }) => {
    if ($status === "FINALIZED") return SUCCESS_COLOR;
    if ($status === "IN_PROGRESS") return WARNING_COLOR;
    return "transparent";
  }};
`;

export const SlotStudentsContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
`;

export const Student = styled.span` 
    line-height: 36px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: ${FONT_FAMILY};
    height: 36px;
    color: ${DEFAULT_TEXT_COLOR};
    border-radius: 5px;
    padding: 0 8px; 
    box-sizing: border-box;
    &:hover {
        cursor: pointer;
        background-color: ${LIGHT_NEUTRAL_COLOR};
    }
`;


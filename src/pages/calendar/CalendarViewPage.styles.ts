import styled from "styled-components";
import { DANGER_COLOR, DEFAULT_TEXT_COLOR, FONT_FAMILY, FONT_WEIGHT_BOLD, LIGHT_NEUTRAL_COLOR, NEUTRAL_COLOR, SUCCESS_COLOR, WARNING_COLOR } from "../../utils/Stylesheet";

export const MainContainer = styled.div`
display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin:5px;
`;

export const SecondaryContainer = styled.div`
  display:flex;
  flex-direction: row;
  gap: 24px;
  align-items: flex-start;
`;

export const DayColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  height: auto;
  overflow: visible;
`;

export const ScheduledTime = styled.div`
    display: flex;
    flex-direction: column;
    gap:32px;
    margin-top: 101px;
     
`;
export const TimeSlot = styled.p`
    font-size: 16px;
    font-family: ${FONT_FAMILY};
    font-weight: ${FONT_WEIGHT_BOLD};
    border-radius: 5px;
    color: ${DEFAULT_TEXT_COLOR};
    height: 260px;
    width: 64px;
    background-color: ${LIGHT_NEUTRAL_COLOR};
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0px;
    margin: 0px;
`;
interface SpecificSlotProps {
  $isNull: boolean;
}

export const SpecificSlot = styled.div<SpecificSlotProps>`
    width: 272px;
    height: 260px;
    border: ${(props) => props.$isNull ? "none" : "4px solid " + LIGHT_NEUTRAL_COLOR};
    border-radius: 8px;
    max-height:  260px;   
    overflow-y :auto; 
    padding: 0px;
    margin: 0px;
    box-sizing: border-box;
`;

export const Title = styled.h1`
    font-family: ${FONT_FAMILY};
    color: ${DEFAULT_TEXT_COLOR};
    font-weight: ${FONT_WEIGHT_BOLD};
    font-size: 16px;
   
`;

export const ActionsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 16px;
    gap: 16px;
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
    margin-left: 24px;
    margin-top: 16px;
`;
interface SlotInfoProps {
  $isFull?: boolean;
  $isFinalized?: boolean;
  $isInProgress?: boolean;
}


export const SlotInfo = styled.span<SlotInfoProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: white;
    font-family: ${FONT_FAMILY};
    font-weight: ${FONT_WEIGHT_BOLD};
    border-radius: 5px;
    padding: 2px 6px 2px 6px;
     
`;

export const SlotCapacity = styled(SlotInfo) <SlotInfoProps>`
    background-color: ${(props) => props.$isFull ? DANGER_COLOR : SUCCESS_COLOR};
`;


export const SlotStatus = styled(SlotInfo) <SlotInfoProps>`
   background-color: ${({ $isFinalized, $isInProgress }) => {
    if ($isFinalized) return SUCCESS_COLOR;
    if ($isInProgress) return WARNING_COLOR;
    return "transparent";
  }};
`;




export const SlotStudentsContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 16px;
    gap: 4px;
    margin-left: 16px;
`;

export const Student = styled.span` 
  display: flex;
    align-items: center;
   padding-left: 16px;
    font-size: 16px;
    font-family: ${FONT_FAMILY};
    height: 36px;
    width: 208px;
    color: black;
    border-radius: 5px;
    &:hover {
        cursor: pointer;
        background-color: ${LIGHT_NEUTRAL_COLOR};
}
`;



export const Number = styled.span`
   font-size: 16px;
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
    margin-left: 8px;
    
`;

export const TitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
     margin-top: 24px;
`;
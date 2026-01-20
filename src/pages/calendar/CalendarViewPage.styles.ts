import styled from "styled-components";
import {
  DANGER_COLOR,
  DEFAULT_TEXT_COLOR,
  FONT_FAMILY,
  FONT_WEIGHT_BOLD,
  LIGHT_NEUTRAL_COLOR,
  SUCCESS_COLOR,
  WARNING_COLOR,
  BRAND_COLOR,
} from "../../utils/Stylesheet";

export const MainContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin: 10px 5px 10px 10px;
`;

export const SecondaryContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
`;
export const DayColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  height: auto;
  overflow: visible;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
`;
export const Title = styled.h1`
  font-family: ${FONT_FAMILY};
  color: ${DEFAULT_TEXT_COLOR};
  font-weight: ${FONT_WEIGHT_BOLD};
  font-size: 16px;
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
export const ScheduledTime = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
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
  $columnsCount: number;
}
export const SpecificSlot = styled.div<SpecificSlotProps>`
  width: var(--slot-width);
  height: 260px;
  border: ${(props) =>
    props.$isNull ? "none" : "4px solid " + LIGHT_NEUTRAL_COLOR};
  border-radius: 8px;
  max-height: 260px;
  overflow-y: auto;
  overflow-x: var(--overflowX);
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
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
  margin-left: var(--margin-info-left);
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
  padding: var(--padding);
`;

export const SlotCapacity = styled(SlotInfo)<SlotInfoProps>`
  background-color: ${(props) =>
    props.$isFull ? DANGER_COLOR : SUCCESS_COLOR};
`;

export const SlotStatus = styled(SlotInfo)<SlotInfoProps>`
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
  margin-left: var(--margin-student-left);
  margin-bottom: 8px;
`;

export const Student = styled.span`
  display: block;
  line-height: 36px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  align-items: center;
  padding-left: var(--padding-left);
  font-size: 16px;
  font-family: ${FONT_FAMILY};
  height: 36px;
  width: var(--student-width);
  color: ${DEFAULT_TEXT_COLOR};
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    background-color: ${BRAND_COLOR};
  }
`;

import styled from "styled-components";
import {
  BACKGROUND_COLOR,
  DANGER_COLOR,
  DEFAULT_TEXT_COLOR,
  FONT_FAMILY,
  FONT_WEIGHT_BOLD,
  FONT_WEIGHT_NORMAL,
  LIGHT_NEUTRAL_COLOR,
  NEUTRAL_COLOR,
  SUCCESS_COLOR,
  WARNING_COLOR,
} from "../../../utils/Stylesheet";

const ROW_HEIGHT = "260px";

interface SpecificSlotProps {
  $columnsCount: number;
}

export const SpecificSlot = styled.div<SpecificSlotProps>`
  height: ${ROW_HEIGHT};
  border: 4px solid ${LIGHT_NEUTRAL_COLOR};
  background-color: "transparent";
  border-radius: 8px;
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 4px;
  align-items: center;
  justify-content: space-between;
`;
export const ActionGroup = styled.div`
  display: flex;
`;
const TooltipWrapper = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  background-color: transparent;
  border: none;
`;

export const Tooltip = styled.div`
  position: absolute;
  top: 120%;
  left: 50%;
  transform: translateX(-50%);
  background: ${DEFAULT_TEXT_COLOR};
  color: ${BACKGROUND_COLOR};
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: 0.2s ease;
`;

export const TooltipContainer = styled(TooltipWrapper)<{ disabled?: boolean }>`
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  ${(props) =>
    props.disabled &&
    `
    filter: grayscale(1) opacity(0.5);
    &:hover ${Tooltip} {
      background: DANGER_COLOR; 
    }
  `}
  &:hover ${Tooltip} {
    opacity: 1;
  }
`;
export const CancelIcon = styled.img`
  width: 18px;
  height: 18px;
  transform: rotate(45deg);
`;

export const SearchFilterContainer = styled.div`
  display: flex;
  height: 34px;
`;
export const SlotInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin-top: 16px;
`;

interface SlotInfoProps {
  $isFull?: boolean;
  $status?: string;
  $isCanceled?: boolean;
}

interface SlotInfoProps {
  $isFull?: boolean;
  $status?: string;
}
export const SlotInfo = styled.span<SlotInfoProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: ${BACKGROUND_COLOR};
  font-family: ${FONT_FAMILY};
  font-weight: ${FONT_WEIGHT_BOLD};
  border-radius: 5px;
  padding: 2px 6px 2px 4px;
  margin-left: 2px;
`;

export const SlotCapacity = styled(SlotInfo)<SlotInfoProps>`
  background-color: ${({ $isCanceled, $isFull }) =>
    $isCanceled ? NEUTRAL_COLOR : $isFull ? DANGER_COLOR : SUCCESS_COLOR};
`;

export const SlotStatus = styled(SlotInfo)<SlotInfoProps>`
  background-color: ${({ $status }) => {
    if ($status === "FINALIZED") return SUCCESS_COLOR;
    if ($status === "IN_PROGRESS") return WARNING_COLOR;
    return "transparent";
  }};
`;
export const CanceledSlot = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${NEUTRAL_COLOR};
  font-size: 16px;
  font-weight: ${FONT_WEIGHT_BOLD};
  font-family: ${FONT_FAMILY};
`;
export const SlotStudentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  overflow-y: auto;
  max-height: 140px;
`;

export const StudentName = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  height: 36px;
  border-radius: 5px;
  box-sizing: border-box;
  color: ${DEFAULT_TEXT_COLOR};
  &:hover {
    cursor: pointer;
    background-color: ${LIGHT_NEUTRAL_COLOR};
  }
`;

export const StudentText = styled.p<{
  $isAbsent?: boolean;
  $isRecover?: boolean;
}>`
  font-family: ${FONT_FAMILY};
  font-size: 16px;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${({ $isAbsent }) => ($isAbsent ? NEUTRAL_COLOR : DEFAULT_TEXT_COLOR)};
  font-weight: ${({ $isRecover }) =>
    $isRecover ? FONT_WEIGHT_BOLD : FONT_WEIGHT_NORMAL};
  text-decoration: ${({ $isAbsent }) => ($isAbsent ? "line-through" : "none")};
  opacity: ${({ $isAbsent }) => ($isAbsent ? 0.7 : 1)};
  margin-left: 6px;
`;

export const AbsenceBadge = styled.div`
  background-color: ${NEUTRAL_COLOR};
  color: ${BACKGROUND_COLOR};
  font-size: 11px;
  font-weight: ${FONT_WEIGHT_BOLD};
  margin-left: 6px;
  width: 16px;
  height: 16px;
  border-radius: 4px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RecoverBadge = styled(AbsenceBadge)`
  background-color: ${SUCCESS_COLOR};
`;

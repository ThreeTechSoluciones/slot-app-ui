import styled from "styled-components";
import {
  BACKGROUND_COLOR,
  DEFAULT_TEXT_COLOR,
  FONT_WEIGHT_BOLD,
  FONT_WEIGHT_NORMAL,
  LIGHT_NEUTRAL_COLOR,
  SUCCESS_COLOR,
} from "../../../utils/Stylesheet";
export const RecoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 0 32px;
  width: 100%;
  box-sizing: border-box;
`;
export const RecoverSubtitle = styled.p`
  font-size: 16px;
  color: ${DEFAULT_TEXT_COLOR};
`;
export const RecoverList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
  max-height: 328px;
  overflow-y: auto;
  padding-right: 4px;
`;
export const RecoverItem = styled.div<{ $selected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 56px;
  border-radius: 12px;
  box-sizing: border-box;
  cursor: pointer;
  border: 1.5px solid ${DEFAULT_TEXT_COLOR};
  transition: all 0.2s ease;
`;
export const RecoverItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
export const RecoverCheckbox = styled.div<{ $checked?: boolean }>`
  width: 28px;
  height: 26px;
  border-radius: 35%;
  background-color: ${({ $checked }) =>
    $checked ? SUCCESS_COLOR : LIGHT_NEUTRAL_COLOR};
  margin-left: 8px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 26px;
    height: 24px;
    opacity: ${({ $checked }) => ($checked ? 1 : 0)};
    transform: ${({ $checked }) => ($checked ? "scale(1)" : "scale(0.6)")};
    transition: all 0.3s ease;
  }
`;
export const RecoverLetter = styled.div`
  width: 24px;
  height: 24px;
  background-color: ${SUCCESS_COLOR};
  color: ${BACKGROUND_COLOR};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  margin-left: 8px;
`;
export const RecoverStudentName = styled.p<{ $selected?: boolean }>`
  color: ${DEFAULT_TEXT_COLOR};
  font-weight: ${({ $selected }) =>
    $selected ? FONT_WEIGHT_BOLD : FONT_WEIGHT_NORMAL};
  display: flex;
  align-items: center;
  gap: 6px;
  border-radius: 5px;
  box-sizing: border-box;
  &:hover {
    cursor: pointer;
  }
`;
export const RecoverBadge = styled.div`
  width: 28px;
  height: 26px;
  border-radius: 50%;
  background-color: ${LIGHT_NEUTRAL_COLOR};
  color: ${DEFAULT_TEXT_COLOR};
  font-size: 12px;
  font-weight: 600;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

import styled from 'styled-components';
import {
  BORDER_RADIUS,
  BRAND_COLOR,
  DEFAULT_TEXT_COLOR,
  FONT_WEIGHT_BOLD,
  LIGHT_NEUTRAL_COLOR,
  MEDIUM_FONT_SIZE,
  NEUTRAL_COLOR,
} from '../../utils/Stylesheet';

export const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const ArrowButton = styled.button<{ disabled?: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background-color: ${LIGHT_NEUTRAL_COLOR};
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  cursor: pointer;
  color: ${({ disabled }) => (disabled ? NEUTRAL_COLOR : DEFAULT_TEXT_COLOR)};
  &:hover {
    background-color: ${({ disabled }) => (disabled ? LIGHT_NEUTRAL_COLOR : BRAND_COLOR)};
  }
`;
export const ArrowIconContainer = styled.div<{
  $rotated?: boolean;
  $disabled?: boolean;
}>`
  transform: ${({ $rotated }) => ($rotated ? 'rotate(180deg)' : 'none')};
  opacity: ${({ $disabled }) => ($disabled ? 0.3 : 1)};
  filter: ${({ $disabled }) => ($disabled ? 'grayscale(100%)' : 'none')};
  img {
    width: 20px;
    height: 20px;
  }
`;

export const PageIndicator = styled.div`
  font-size: ${MEDIUM_FONT_SIZE};
  font-weight: ${FONT_WEIGHT_BOLD};
  color: ${DEFAULT_TEXT_COLOR};
  padding: 6px 12px;
`;

export const PageSizeSelect = styled.select`
  font-size: ${MEDIUM_FONT_SIZE};
  color: ${DEFAULT_TEXT_COLOR};
  padding: 6px 8px;
  border-radius: ${BORDER_RADIUS};
  background-color: ${LIGHT_NEUTRAL_COLOR};
  border: none;
  cursor: pointer;
  &:focus {
    border-color: ${NEUTRAL_COLOR};
    outline: none;
    box-shadow: none;
  }
`;

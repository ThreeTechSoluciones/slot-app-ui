import styled from 'styled-components';
import { DEFAULT_TEXT_COLOR, BACKGROUND_COLOR } from '../../utils/Stylesheet';

export const Container = styled.div`
  position: relative;
  display: inline-block;
  align-items: center;

  &:hover div {
    opacity: 1;
  }
`;

export const TooltipContent = styled.div`
  position: absolute;
  top: 80%;
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
  z-index: 10;
`;

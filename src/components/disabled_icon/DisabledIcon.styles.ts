import styled from 'styled-components';
import { DEFAULT_TEXT_COLOR, BACKGROUND_COLOR } from '../../utils/Stylesheet';

export const TooltipWrapper = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  background-color: transparent;
  border: none;
  padding: 0;
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
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

  ${(props) =>
    props.disabled &&
    `
    filter: grayscale(1) opacity(0.5);
  `}

  &:hover ${Tooltip} {
    opacity: 1;
  }
`;

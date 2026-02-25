import styled from 'styled-components';
import { BORDER_RADIUS, BRAND_COLOR, LIGHT_NEUTRAL_COLOR } from '../../utils/Stylesheet';

export const DropdownContainer = styled.div`
  position: relative;
`;

interface ButtonTriggerProps {
  imgWidth?: string;
  imgHeight?: string;
}
export const ButtonTrigger = styled.div<ButtonTriggerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${BORDER_RADIUS};
  cursor: pointer;
  gap: 10px;
  padding: 12px;
  img {
    width: ${(props) => props.imgWidth};
    height: ${(props) => props.imgHeight};
  }
`;

interface DropdownContainerProps {
  width?: string;
  size?: 'small' | 'medium';
}
export const DropdownMenuStyle = styled.div<DropdownContainerProps>`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: ${LIGHT_NEUTRAL_COLOR};
  border: 1px solid #ccc;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 10;
  max-height: 135px;
  overflow-y: auto;
  width: ${(props) => (props.size === 'small' ? '184px' : '408px')};
`;

export const ButtonOption = styled.button`
  background: none;
  color: black;
  border: none;
  padding: 10px 9px;
  font-size: 12px;
  text-align: center;
  cursor: pointer;
  &:hover {
    background: ${BRAND_COLOR};
  }
`;

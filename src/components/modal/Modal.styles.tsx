import styled from 'styled-components';
import {
  BACKGROUND_COLOR,
  BORDER_RADIUS,
  BRAND_COLOR,
  NEUTRAL_COLOR,
  DEFAULT_TEXT_COLOR,
} from '../../utils/Stylesheet';

export const ModalSlotContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: ${BORDER_RADIUS};
  width: 480px;
  background-color: ${BACKGROUND_COLOR};
  padding: 32px;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 20px;
`;
export const Button = styled.button`
  width: 192px;
  height: 48px;
  background: ${BRAND_COLOR};
  border-radius: ${BORDER_RADIUS};
  border: none;
  font-size: 14px;
  color: ${DEFAULT_TEXT_COLOR};
  &:hover {
    cursor: pointer;
    background: ${NEUTRAL_COLOR};
  }
`;

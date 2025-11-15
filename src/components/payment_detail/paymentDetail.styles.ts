import styled from "styled-components";
import {
  BORDER_RADIUS,
  BACKGROUND_COLOR,
  FONT_FAMILY,
} from "../../utils/Stylesheet";
export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
export const ModalContainer = styled.div`
  width: 380px;
  background: ${BACKGROUND_COLOR};
  padding: 24px;
  border-radius: ${BORDER_RADIUS};
  position: relative;
  display: flex;
  flex-direction: column;
`;
export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const ModalTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 16px;
  font-family: ${FONT_FAMILY};
`;
export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 16px;
  font-family: ${FONT_FAMILY};
`;
export const CloseButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

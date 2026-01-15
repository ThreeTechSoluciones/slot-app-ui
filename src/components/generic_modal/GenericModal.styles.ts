import styled from "styled-components";
import {
  BORDER_RADIUS,
  BACKGROUND_COLOR,
  FONT_FAMILY,
} from "../../utils/Stylesheet";
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

export const ModalContainer = styled.div<{ $width: string; $height: string }>`
  background: ${BACKGROUND_COLOR};
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  border-radius: ${BORDER_RADIUS};
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;
export const ModalHeader = styled.div`
  margin-top: 56px;
`;
export const ModalTitle = styled.h2`
  align-items: center;
  display: flex;
  justify-content: center;
  font-size: 24px;
`;
export const ModalBody = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
  font-family: ${FONT_FAMILY};
`;
export const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
`;

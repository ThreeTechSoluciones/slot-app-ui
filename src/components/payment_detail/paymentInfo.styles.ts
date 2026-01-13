import styled from "styled-components";
import {
  BORDER_RADIUS,
  BACKGROUND_COLOR,
  FONT_FAMILY,
  LIGHT_NEUTRAL_COLOR,
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
  width: 416px;
  height: 360px;
  max-height: 90vh;
  background: ${BACKGROUND_COLOR};
  padding: 24px;
  border-radius: ${BORDER_RADIUS};
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const ModalTitle = styled.h2`
  font-size: 24px;
  margin: 0;
  text-align: center;
  font-weight: 800;
  font-family: ${FONT_FAMILY};
`;
export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
`;
export const TextColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  justify-content: center;
`;

export const FeeTitle = styled.h3`
  font-family: ${FONT_FAMILY};
  font-size: 16px;
  font-weight: 800;
  margin: 0 0 56px 0;
  text-align: center;
`;

export const FieldLabel = styled.span`
  font-family: ${FONT_FAMILY};
  font-size: 16px;
  font-weight: 800;
  line-height: 1.2;
  margin: 0;
`;

export const Value = styled.p`
  font-family: ${FONT_FAMILY};
  font-size: 16px;
  line-height: 1.2;
  margin: 0;
`;
export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;
export const ModalRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: 32px;
`;

export const IconCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${LIGHT_NEUTRAL_COLOR};
  display: flex;
  align-items: center;
  justify-content: center;
`;

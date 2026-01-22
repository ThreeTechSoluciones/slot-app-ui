import styled from "styled-components";
import {
  BORDER_RADIUS,
  BACKGROUND_COLOR,
  FONT_FAMILY,
  LIGHT_NEUTRAL_COLOR,
  FONT_WEIGHT_BOLD,
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
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 8px;
`;
export const IconWrapper = styled.div<{ $size?: string }>`
  border-radius: 50%;
  background-color: ${LIGHT_NEUTRAL_COLOR};
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const StyledIcon = styled.img<{ $size?: string }>`
  width: ${(props) => props.$size || "24px"};
  height: ${(props) => props.$size || "24px"};
`;

interface TitleProps {
  $isConfirmModal?: boolean;
}

export const ModalTitle = styled.h2<TitleProps>`
  margin: ${(props) => (props.$isConfirmModal ? "0" : "10px 0 20px 0")};
  align-items: center;
  display: flex;
  justify-content: center;
  font-size: 24px;
  font-family: ${FONT_FAMILY};
  font-weight: ${FONT_WEIGHT_BOLD};
`;
export const ModalBody = styled.div`
  margin-bottom: 25px;
  font-size: 16px;
  font-family: ${FONT_FAMILY};
`;
export const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

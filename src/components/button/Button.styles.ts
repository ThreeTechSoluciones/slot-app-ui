import styled from "styled-components";
import {
  SUCCESS_COLOR,
  PRIMARY_COLOR,
  TEXT_COLOR,
  ERROR_COLOR,
  BACKGROUND_COLOR,
  TERTIARY_COLOR,
  BORDER_RADIUS,
  FONT_FAMILY,
} from "../../utils/Stylesheet";
export const StyledButton = styled.button<{
  $size?: "small" | "medium" | "large";
  $variant?: "primary" | "warning" | "success";
}>`
  border: none;
  padding: 0;
  align-items: center;
  border-radius: ${BORDER_RADIUS};
  cursor: pointer;
  width: ${({ $size }) =>
    $size === "small" ? "104px" : $size === "medium" ? "192px" : "412px"};
  height: ${({ $size }) =>
    $size === "small" ? "48px" : $size === "medium" ? "48px" : "56px"};
  font-size: ${({ $size }) =>
    $size === "small" ? "12px" : $size === "medium" ? "12px" : "16px"};

  background-color: ${({ $variant }) =>
    $variant === "primary"
      ? PRIMARY_COLOR
      : $variant === "warning"
      ? ERROR_COLOR
      : $variant === "success"
      ? SUCCESS_COLOR
      : TEXT_COLOR};

  color: ${({ $variant }) =>
    $variant === "primary"
      ? TEXT_COLOR
      : $variant === "warning"
      ? TEXT_COLOR
      : $variant === "success"
      ? TEXT_COLOR
      : BACKGROUND_COLOR};

  &:hover {
    opacity: 0.9;
    background-color: ${TERTIARY_COLOR};
  }
`;
export const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100%;
`;

export const ButtonIcon = styled.span`
  position: absolute;
  right: 18px;
`;

export const ButtonText = styled.span<{
  $fontsize?: "small" | "medium" | "large";
}>`
  display: inline-block;
  text-align: center;
  font-family: ${FONT_FAMILY};
  font-size: ${({ $fontsize }) =>
    $fontsize === "small" ? "12px" : $fontsize === "medium" ? "14px" : "16px"};
`;

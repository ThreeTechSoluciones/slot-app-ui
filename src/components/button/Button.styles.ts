import styled from 'styled-components';
import {
  SUCCESS_COLOR,
  BRAND_COLOR,
  DEFAULT_TEXT_COLOR,
  DANGER_COLOR,
  BACKGROUND_COLOR,
  NEUTRAL_COLOR,
  BORDER_RADIUS,
  SMALL_FONT_SIZE,
  DEFAULT_FONT_SIZE,
  MEDIUM_FONT_SIZE,
} from '../../utils/Stylesheet';
export const StyledButton = styled.button<{
  $size?: 'small' | 'medium' | 'large';
  $variant?: 'primary' | 'warning' | 'success';
}>`
  border: none;
  padding: 0;
  align-items: center;
  border-radius: ${BORDER_RADIUS};
  cursor: pointer;
  width: ${({ $size }) => ($size === 'small' ? '104px' : $size === 'medium' ? '192px' : '412px')};
  height: ${({ $size }) => ($size === 'small' ? '48px' : $size === 'medium' ? '48px' : '56px')};
  font-size: ${({ $size }) => ($size === 'small' ? '12px' : $size === 'medium' ? '12px' : '16px')};

  background-color: ${({ $variant }) =>
    $variant === 'primary'
      ? BRAND_COLOR
      : $variant === 'warning'
        ? DANGER_COLOR
        : $variant === 'success'
          ? SUCCESS_COLOR
          : DEFAULT_TEXT_COLOR};

  color: ${({ $variant }) =>
    $variant === 'primary'
      ? DEFAULT_TEXT_COLOR
      : $variant === 'warning'
        ? DEFAULT_TEXT_COLOR
        : $variant === 'success'
          ? DEFAULT_TEXT_COLOR
          : BACKGROUND_COLOR};

  &:hover {
    opacity: 0.9;
    background-color: ${NEUTRAL_COLOR};
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
  $fontsize?: 'small' | 'medium' | 'large';
}>`
  display: inline-block;
  text-align: center;
  font-size: ${({ $fontsize }) =>
    $fontsize === 'small'
      ? SMALL_FONT_SIZE
      : $fontsize === 'medium'
        ? MEDIUM_FONT_SIZE
        : DEFAULT_FONT_SIZE};
`;

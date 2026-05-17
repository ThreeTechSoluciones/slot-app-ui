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

const buttonSizes = {
  small: {
    width: '104px',
    height: '48px',
    fontSize: '12px',
  },
  medium: {
    width: '192px',
    height: '48px',
    fontSize: '12px',
  },
  large: {
    width: '392px',
    height: '56px',
    fontSize: '16px',
  },
  full: {
    width: '100%',
    height: '56px',
    fontSize: '16px',
  },
};

export const StyledButton = styled.button<{
  $size?: 'small' | 'medium' | 'large' | 'full';
  $variant?: 'primary' | 'warning' | 'success';
}>`
  border: none;
  padding: 0;
  align-items: center;
  border-radius: ${BORDER_RADIUS};
  cursor: pointer;
  width: ${({ $size }) => buttonSizes[$size || 'medium'].width};
  height: ${({ $size }) => buttonSizes[$size || 'medium'].height};
  font-size: ${({ $size }) => buttonSizes[$size || 'medium'].fontSize};

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

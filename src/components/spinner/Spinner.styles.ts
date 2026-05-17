import styled, { keyframes } from 'styled-components';
import { BRAND_COLOR, LIGHT_NEUTRAL_COLOR } from '../../utils/Stylesheet';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const SpinnerCircle = styled.div<{
  size?: number;
  color?: string;
}>`
  width: ${({ size = 14 }) => `${size}px`};
  height: ${({ size = 14 }) => `${size}px`};
  border: 2px solid ${LIGHT_NEUTRAL_COLOR};
  border-top-color: ${({ color = BRAND_COLOR }) => color};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
  flex-shrink: 0;
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

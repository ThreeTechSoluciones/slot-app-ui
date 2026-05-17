import styled, { keyframes, createGlobalStyle } from 'styled-components';
import {
  BRAND_COLOR,
  DEFAULT_TEXT_COLOR,
  NEUTRAL_COLOR,
  WARNING_COLOR,
} from '../../utils/Stylesheet';

const Spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

const SunPulse = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.1; }
`;
export const GlobalStyle = createGlobalStyle`
  @keyframes pedalSpin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
`;
export const Svg = styled.svg``;
export const Sun = styled.circle`
  fill: ${BRAND_COLOR};
  animation: ${SunPulse} 4s ease-in-out infinite;
`;
export const MiniSun = styled.circle`
  fill: ${WARNING_COLOR};
  animation: ${SunPulse} 4s ease-in-out infinite;
  animation-delay: -1s;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Wheel = styled.circle`
  fill: none;
  stroke: ${DEFAULT_TEXT_COLOR};
  stroke-width: 3.5;
`;

export const InnerWheel = styled.circle`
  fill: none;
  stroke: ${NEUTRAL_COLOR};
  stroke-width: 2.5;
  stroke-dasharray: 30 58;
  stroke-linecap: round;
  animation: ${Spin} 1.2s linear infinite;
  transform-box: fill-box;
  transform-origin: center;
`;

export const FrameLine = styled.line`
  stroke: ${DEFAULT_TEXT_COLOR};
  stroke-width: 4;
  stroke-linecap: round;
`;

export const PedalRing = styled.circle`
  fill: none;
  stroke: ${DEFAULT_TEXT_COLOR};
  stroke-width: 1.5;
`;

export const PedalCenter = styled.circle`
  fill: ${BRAND_COLOR};
`;

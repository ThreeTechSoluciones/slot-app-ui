import styled, { createGlobalStyle } from 'styled-components';
import { BRAND_COLOR, LIGHT_NEUTRAL_COLOR } from '../../utils/Stylesheet';

export const GlobalStyle = createGlobalStyle`
  @keyframes bar {
    0%   { width: 0%; background-position: -200px; }
    80%  { width: 90%; background-position: 400px; }
    100% { width: 90%; background-position: 800px; }
  }
   @keyframes shimmerSkeleton {
    0%   { background-position: -300px; }
    100% { background-position: 600px; }
  }
`;

export const ProgressTrack = styled.div`
  width: 100px;
  height: 3px;
  background: ${LIGHT_NEUTRAL_COLOR};
  border-radius: 99px;
  overflow: hidden;
  margin-top: 8px;
`;

export const ProgressFill = styled.div`
  height: 100%;
  border-radius: 99px;
  background: linear-gradient(90deg, ${BRAND_COLOR} 25%, #ffe680 50%, ${BRAND_COLOR} 75%);
  background-size: 200px 100%;
  animation: bar 3s ease-out infinite;
`;

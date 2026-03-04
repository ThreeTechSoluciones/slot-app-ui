import styled from 'styled-components';
import { FONT_WEIGHT_BOLD, LARGE_FONT_SIZE } from '../../../utils/Stylesheet';

export const Title = styled.h1`
  font-size: ${LARGE_FONT_SIZE};
  margin-right: 80px;
  margin-top: 32px;
  font-weight: ${FONT_WEIGHT_BOLD};
`;

export const TitleContainer = styled.div`
  width: calc(100% - 80px);
  margin-left: 80px;
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
`;

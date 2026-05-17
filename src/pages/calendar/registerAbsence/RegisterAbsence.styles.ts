import styled from 'styled-components';
import { LIGHT_NEUTRAL_COLOR } from '../../../utils/Stylesheet';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const IconContainer = styled.div`
  border-radius: 50%;
  background-color: ${LIGHT_NEUTRAL_COLOR};
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledIcon = styled.img<{ $size?: string }>`
  width: ${(props) => props.$size || '24px'};
  height: ${(props) => props.$size || '24px'};
`;

export const Text = styled.p`
  font-size: 16px;
  text-align: center;
`;

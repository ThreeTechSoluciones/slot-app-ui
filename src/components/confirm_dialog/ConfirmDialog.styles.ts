import styled from 'styled-components';
import { DEFAULT_FONT_SIZE, FONT_WEIGHT_NORMAL } from '../../utils/Stylesheet';

export const InfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;
export const QuestionStyle = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const MessageStyle = styled.p`
  font-size: ${DEFAULT_FONT_SIZE};
  font-weight: ${FONT_WEIGHT_NORMAL};
`;

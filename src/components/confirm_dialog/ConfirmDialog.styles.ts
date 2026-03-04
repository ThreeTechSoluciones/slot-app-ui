import styled from 'styled-components';
import { DEFAULT_FONT_SIZE, FONT_WEIGHT_NORMAL } from '../../utils/Stylesheet';
export const ConfirmOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.126);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

export const ConfirmBox = styled.div`
  white-space: normal;
  background: white;
  padding: 20px;
  border-radius: 15px;
  border-left: 5px solid #f0e21e;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 360px;
  height: 148px;
`;

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

export const ConfirmActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 1vw;
`;
export const MessageStyle = styled.p`
  font-size: ${DEFAULT_FONT_SIZE};
  font-weight: ${FONT_WEIGHT_NORMAL};
  initial-letter: 0.15px;
`;

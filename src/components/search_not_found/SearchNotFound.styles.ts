import styled from 'styled-components';
import { DEFAULT_TEXT_COLOR } from '../../utils/Stylesheet';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  box-sizing: border-box;
`;

interface MessageProps {
  $fontSize: string;
}
export const Message = styled.p<MessageProps>`
  text-align: center;
  color: ${DEFAULT_TEXT_COLOR};
  max-width: 470px;
  font-size: ${(props) => props.$fontSize};
`;

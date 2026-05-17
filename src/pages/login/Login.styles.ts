import styled from 'styled-components';
import { NEUTRAL_COLOR, DEFAULT_TEXT_COLOR, DEFAULT_FONT_SIZE } from '../../utils/Stylesheet';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  overflow-y: auto;
`;

export const Title = styled.h1`
  font-size: 24px;
  margin: 0px;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 392px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
export const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin-top: 8px;
  margin-bottom: 8px;
  padding: 0px;
`;

export const ForgotPasswordText = styled.p`
  color: ${DEFAULT_TEXT_COLOR};
  text-decoration: underline;
  font-size: ${DEFAULT_FONT_SIZE};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition:
    color 0.3s ease,
    opacity 0.3s ease;

  &:hover {
    color: ${NEUTRAL_COLOR};
    opacity: 0.8;
  }
`;

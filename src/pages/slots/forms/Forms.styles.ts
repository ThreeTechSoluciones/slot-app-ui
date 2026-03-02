import styled from 'styled-components';
import { DEFAULT_FONT_SIZE, MEDIUM_FONT_SIZE, NEUTRAL_COLOR } from '../../../utils/Stylesheet';
import { DEFAULT_TEXT_COLOR, BORDER_RADIUS, BACKGROUND_COLOR } from '../../../utils/Stylesheet';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Input = styled.input`
  width: 396px;
  height: 56px;
  border: 1px solid black;
  border-radius: ${BORDER_RADIUS};
  font-size: ${MEDIUM_FONT_SIZE};
  padding-left: 16px;
  margin-bottom: 4px;
  color: ${DEFAULT_TEXT_COLOR};
  background-color: ${BACKGROUND_COLOR};
  &::placeholder {
    color: ${NEUTRAL_COLOR};
    font-size: ${MEDIUM_FONT_SIZE};
  }
`;

export const Label = styled.label`
  font-size: ${DEFAULT_FONT_SIZE};
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

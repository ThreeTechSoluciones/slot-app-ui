import styled from 'styled-components';
import {
  LIGHT_NEUTRAL_COLOR,
  NEUTRAL_COLOR,
  DEFAULT_TEXT_COLOR,
  MEDIUM_FONT_SIZE,
  FOCUS_STYLE,
} from '../Stylesheet';

type PriceInputProps = {
  width: string;
};

export const PriceInput = styled.input<PriceInputProps>`
  width: ${(props) => props.width};
  box-sizing: border-box;
  height: 56px;
  padding: 0 16px;
  border-radius: 10px;
  font-size: ${MEDIUM_FONT_SIZE};
  color: ${DEFAULT_TEXT_COLOR};
  background: ${(props) => (props.disabled ? LIGHT_NEUTRAL_COLOR : 'none')};
  border: ${(props) => (props.disabled ? LIGHT_NEUTRAL_COLOR : '1px solid black')};
  &::placeholder {
    color: ${(props) => (props.disabled ? LIGHT_NEUTRAL_COLOR : NEUTRAL_COLOR)};
    font-size: ${MEDIUM_FONT_SIZE};
  }
  &:focus {
    ${FOCUS_STYLE};
  }
`;

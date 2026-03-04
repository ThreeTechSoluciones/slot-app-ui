import styled from 'styled-components';
import { BORDER_RADIUS, DEFAULT_TEXT_COLOR, MEDIUM_FONT_SIZE } from '../../utils/Stylesheet';

export const Input = styled.input`
  border: 1px solid ${DEFAULT_TEXT_COLOR};
  border-radius: ${BORDER_RADIUS};
  height: 56px;
  width: 100%;
  box-sizing: border-box;
  padding: 0 12px;
  font-size: ${MEDIUM_FONT_SIZE};
  color: ${DEFAULT_TEXT_COLOR};
  background-color: white;
  &::placeholder {
    font-size: ${MEDIUM_FONT_SIZE};
  }
  &[type='number'] {
    -moz-appearance: textfield;
    appearance: textfield;
  }
  &[type='number']::-webkit-inner-spin-button,
  &[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /* Específico para Firefox - oculta los spinners */
  &[type='number']::-moz-number-spin-box {
    appearance: none;
    -moz-appearance: none;
  }
`;
export const InputWithIconWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
`;

interface InputIconProps {
  $position?: 'left' | 'right';
  disabled?: boolean;
}

export const InputIcon = styled.img<InputIconProps>`
  position: absolute;
  right: ${(props) => (props.$position === 'left' ? '72px' : '32px')};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  pointer-events: auto;
  transition: opacity 0.2s ease;
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};
  &:hover {
    opacity: ${(props) => (props.disabled ? '0.5' : '0.7')};
  }
`;

import styled from 'styled-components';
import {
  BORDER_RADIUS,
  MEDIUM_FONT_SIZE,
  DEFAULT_TEXT_COLOR,
  NEUTRAL_COLOR,
  FOCUS_STYLE,
} from '../../utils/Stylesheet';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
`;

export const Input = styled.input`
  width: 392px;
  height: 56px;
  border: 1px solid black;
  border-radius: ${BORDER_RADIUS};
  font-size: ${MEDIUM_FONT_SIZE};
  padding-left: 16px;
  background: white;
  color: ${DEFAULT_TEXT_COLOR};

  &::placeholder {
    color: ${NEUTRAL_COLOR};
  }

  &:focus {
    ${FOCUS_STYLE}
  }

  &::-ms-reveal,
  &::-ms-clear,
  &::-webkit-textfield-decoration-container,
  &::-webkit-clear-button,
  &::-webkit-inner-spin-button,
  &::-webkit-credentials-auto-fill-button {
    display: none !important;
    pointer-events: none;
  }
`;

interface ImgProps {
  $isInteractive?: boolean;
}

export const Img = styled.img<ImgProps>`
  position: absolute;
  right: 24px;
  width: 24px;
  height: 24px;

  ${({ $isInteractive }) =>
    $isInteractive &&
    `
        &:hover {
          cursor: pointer;
        }
      `}
`;

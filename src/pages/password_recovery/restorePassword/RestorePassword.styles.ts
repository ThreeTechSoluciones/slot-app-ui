import styled from 'styled-components';
import {
  BORDER_RADIUS,
  NEUTRAL_COLOR,
  DEFAULT_TEXT_COLOR,
  MEDIUM_FONT_SIZE,
  FONT_WEIGHT_BOLD,
} from '../../../utils/Stylesheet';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  overflow: hidden;
`;

export const Header = styled.div`
  width: 100%;
  height: 80px;
  position: relative;
`;

export const BackContainer = styled.div`
  position: absolute;
  left: 24px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  p {
    font-size: 20px;
    margin: 0;
  }

  img {
    width: 31px;
    height: 31px;
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  margin: 0;
  text-align: center;
`;

export const Logo = styled.div`
  width: 120px;
  height: 122px;
  margin-top: 40px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition:
      filter 0.3s ease-in-out,
      transform 0.3s ease-in-out;
  }

  img:hover {
    filter: drop-shadow(0px 0px 8px #f0e21e);
    transform: scale(1.05);
  }
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
  max-width: 392px;
  margin-top: 24px;
`;

export const Label = styled.label`
  font-size: 16px;
  font-weight: ${FONT_WEIGHT_BOLD};
  margin: 4px 0;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
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
  &::-ms-reveal,
  &::-ms-clear,
  &::-webkit-textfield-decoration-container,
  &::-webkit-clear-button,
  &::-webkit-inner-spin-button,
  &::-webkit-credentials-auto-fill-button {
    display: none !important;
    pointer-events: none;
  }
  &::placeholder {
    color: ${NEUTRAL_COLOR};
  }

  &:focus {
    outline: none;
  }
`;

interface ImgProps {
  $isInteractive?: boolean;
}

export const Img = styled.img<ImgProps>`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);

  ${({ $isInteractive }) =>
    $isInteractive &&
    `
      cursor: pointer;
    `}
`;
export const ErrorContainer = styled.div`
  min-height: 18px;
`;

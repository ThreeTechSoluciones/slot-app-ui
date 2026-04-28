import styled from 'styled-components';
import { FONT_WEIGHT_BOLD, LARGE_FONT_SIZE, DEFAULT_FONT_SIZE } from '../../../utils/Stylesheet';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

export const Header = styled.div`
  width: 100%;
  height: 15%;
  position: relative;
`;

export const BackContainer = styled.div`
  position: absolute;
  left: 25%;
  top: 60%;
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
  font-size: ${LARGE_FONT_SIZE};
  margin: 0;
  text-align: center;
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
  font-size: ${DEFAULT_FONT_SIZE};
  font-weight: ${FONT_WEIGHT_BOLD};
  margin: 4px 0;
`;

export const ErrorContainer = styled.div`
  min-height: 16px;
`;

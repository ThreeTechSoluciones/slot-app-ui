import styled from 'styled-components';
import { DEFAULT_TEXT_COLOR, DEFAULT_FONT_SIZE, LARGE_FONT_SIZE } from '../../../utils/Stylesheet';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;
export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
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
  margin: 0px;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 392px;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
export const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin-top: 8px;
  margin-bottom: 8px;
  padding: 0px;
`;

export const Img = styled.img`
  position: absolute;
  right: 24px;
`;

export const VerificationCodeText = styled.p`
  color: ${DEFAULT_TEXT_COLOR};
  font-size: ${DEFAULT_FONT_SIZE};
  text-align: center;
  margin-top: 16px;
`;
export const ErrorContainer = styled.div`
  min-height: 8px;
`;

import styled from 'styled-components';
import {
  DEFAULT_TEXT_COLOR,
  FONT_WEIGHT_BOLD,
  DEFAULT_FONT_SIZE,
  LARGE_FONT_SIZE,
} from '../../../utils/Stylesheet';
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
  margin: 0px;
`;

export const EmailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8px;
  strong {
    font-size: ${DEFAULT_FONT_SIZE};
    font-weight: ${FONT_WEIGHT_BOLD};
  }
`;
export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  span {
    font-size: ${DEFAULT_FONT_SIZE};
    color: ${DEFAULT_TEXT_COLOR};
  }
`;
export const OtpContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
export const Description = styled.p`
  font-size: ${DEFAULT_FONT_SIZE};
  color: ${DEFAULT_TEXT_COLOR};
  font-weight: ${FONT_WEIGHT_BOLD};
`;
export const ResendCodeContainer = styled.div`
  margin-top: 16px;
  text-align: center;
`;

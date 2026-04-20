import styled from 'styled-components';
import {
  DEFAULT_TEXT_COLOR,
  FONT_WEIGHT_BOLD,
  DEFAULT_FONT_SIZE,
  NEUTRAL_COLOR,
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
  margin: 0px;
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
export const EmailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8px;
  strong {
    font-size: 16px;
    font-weight: ${FONT_WEIGHT_BOLD};
  }
`;
export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  span {
    font-size: 16px;
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
export const ResendCode = styled.p`
  text-decoration: underline;
  cursor: pointer;
  font-weight: ${FONT_WEIGHT_BOLD};
  color: ${DEFAULT_TEXT_COLOR};
  transition:
    color 0.3s ease,
    opacity 0.3s ease;

  &:hover {
    color: ${NEUTRAL_COLOR};
    opacity: 0.8;
  }
`;

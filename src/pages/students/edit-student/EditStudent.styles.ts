import styled from 'styled-components';
import {
  BORDER_RADIUS,
  BRAND_COLOR,
  FONT_WEIGHT_BOLD,
  NEUTRAL_COLOR,
} from '../../../utils/Stylesheet';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-right: 80px;
  margin-top: 32px;
  font-weight: ${FONT_WEIGHT_BOLD};
  display: flex;
  align-items: center;
  img {
    padding-right: 24px;
  }
`;
export const TitleContainer = styled.div`
  width: calc(100% - 80px);
  margin-left: 80px;
`;
export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  align-items: center;
  width: 100%;
`;
export const ButtonsContainer = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 32px;
  margin-bottom: 32px;
`;
export const Button = styled.button`
  width: 192px;
  height: 48px;
  background: ${BRAND_COLOR};
  border-radius: ${BORDER_RADIUS};
  border: none;
  font-size: 12px;
  color: black;
  &:hover {
    cursor: pointer;
    background: ${NEUTRAL_COLOR};
  }
`;

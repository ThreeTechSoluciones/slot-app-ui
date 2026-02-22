import styled from 'styled-components';
import { SUCCESS_COLOR } from '../../utils/Stylesheet';

interface CircleProps {
  $isCurrentStep?: boolean;
  $isBackStep?: boolean;
}

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;
export const Circle = styled.div<CircleProps>`
  background-color: ${(props) =>
    props.$isCurrentStep ? 'black' : props.$isBackStep ? SUCCESS_COLOR : 'white'};
  border: ${(props) =>
    props.$isCurrentStep
      ? '1px solid black'
      : props.$isBackStep
        ? `1px solid ${SUCCESS_COLOR}`
        : '2px solid black'};
  color: ${(props) => (props.$isCurrentStep ? 'white' : props.$isBackStep ? 'white' : 'black')};
  width: 40px;
  height: 40px;
  max-width: 40px;
  border-radius: 50%;
  margin: 0px;
  padding: 0px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    height: 2px;
    width: 105px;
    background-color: ${(props) => (props.$isBackStep ? SUCCESS_COLOR : 'black')};
    left: -50%;
    top: 50%;
    transform: translateY(-50%);
    z-index: -1;
  }
  &::after {
    content: '';
    position: absolute;
    height: 2px;
    width: 105px;
    background-color: ${(props) => (props.$isBackStep ? SUCCESS_COLOR : 'black')};
    right: -50%;
    top: 50%;
    transform: translateY(-50%);
    z-index: -1;
  }
`;

export const Title = styled.p`
  margin: 0px;
  padding: 0px;
  font-size: 12px;
  max-width: 60px;
  display: flex;
  text-align: center;
`;
export const Img = styled.img`
  position: absolute;
  bottom: 40px;
`;

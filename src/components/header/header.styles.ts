import styled, { keyframes } from 'styled-components';

interface OptionProps {
  $isLast?: boolean;
  $hasImg?: boolean;
}

export const MainContainer = styled.header`
  display: flex;
  width: 100%;
  min-height: 96px;
  background-color: #f0e21e;
  box-sizing: border-box;
  justify-content: space-between;
`;
export const LeftOptionsContainer = styled.section`
  display: flex;
  flex-direction: row;
  margin-left: 80px;
  min-height: 96px;
  align-items: center;
  font-size: 16px;
`;
export const RightOptionsContainer = styled(LeftOptionsContainer)`
  gap: 24px;
  margin-right: 80px;
`;

const blurEffect = keyframes`
  0% {
    filter: blur(0);
  }
  50% {
    filter: blur(1px);
  }
  100% {
    filter: blur(0);
  }
`;

const boldEffect = keyframes`
  0% {
    font-weight: 400;
  }
  100% {
    font-weight: 700;
  }
`;

export const Option = styled.div<OptionProps>`
  min-height: 16px;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  width: ${({ $hasImg }) => ($hasImg ? '200px' : '172px')};
  border-right: ${({ $isLast }) => ($isLast ? 'none' : '2px solid black')};
  gap: ${({ $hasImg }) => ($hasImg ? '4px' : '0')};
  transition: font-size 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    font-size: 17px;
    font-weight: bold;
    animation:
      ${blurEffect} 0.2s forwards,
      ${boldEffect} 0.3s forwards;
  }
  img {
    width: ${({ $hasImg }) => ($hasImg ? '16px' : '0')};
    height: ${({ $hasImg }) => ($hasImg ? '16px' : '0')};
  }
`;

export const Logo = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
export const Photo = styled(Logo)`
  border: 2px solid black;
`;
export const Logout = styled(Option)`
  width: 88px;
  min-height: 54px;
  line-height: 16px;
  border: none;
  img {
    width: 32px;
    height: 32px;
  }
  img {
    width: 34px;
    height: 34px;
  }
`;

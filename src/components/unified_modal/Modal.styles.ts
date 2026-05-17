import styled from 'styled-components';
import { BORDER_RADIUS } from '../../utils/Stylesheet';

export const Background = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background-color: white;
  padding: 35px;
  border-radius: ${BORDER_RADIUS};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 24px;
  justify-content: center;
  align-items: center;
  margin-bottom: 4px;
`;

export const TitleContainer = styled.div`
  width: 100%;
  text-align: center;
`;

export const Title = styled.h2`
  margin: 0;
  text-transform: uppercase;
`;

export const CloseButton = styled.button`
  position: absolute;
  right: -30px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
`;

export const ContentContainer = styled.div`
  width: 100%;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 16px;
  width: 100%;
`;

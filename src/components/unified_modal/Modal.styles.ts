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
  z-index: 1500;
`;

export const ModalContainer = styled.div`
  background-color: white;
  padding: 15px 35px 35px 35px;
  border-radius: ${BORDER_RADIUS};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
`

export const TitleContainer = styled.div`

`;

export const CloseButton = styled.button`
  position: relative;
  top: 0px;
  right: 0px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
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

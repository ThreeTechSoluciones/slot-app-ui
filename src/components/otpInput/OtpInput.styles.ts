import styled from 'styled-components';
import { BRAND_COLOR, BORDER_RADIUS } from '../../utils/Stylesheet';

export const Container = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

export const Input = styled.input`
  width: 55px;
  height: 70px;
  text-align: center;
  font-size: 24px;
  border: 1px solid black;
  border-radius: ${BORDER_RADIUS};

  &:focus {
    outline: none;
    border: 2px solid ${BRAND_COLOR};
    background-color: rgba(255, 221, 0, 0.1);
  }
`;

import styled from 'styled-components';
export const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 100%;
`;

export const SortIcon = styled.img<{ $rotated: boolean }>`
  position: absolute;
  right: 4px;
  transition: transform 0.3s ease;
  transform: rotate(${(props) => (props.$rotated ? 180 : 0)}deg);
`;

export const Text = styled.p`
  margin: 0;
`;

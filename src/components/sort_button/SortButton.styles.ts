import styled from "styled-components";
export const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
`;

export const SortIcon = styled.img<{ $rotated: boolean }>`
  position: absolute;
  right: 4px;
  transition: transform 0.3s ease;
  transform: rotate(${(props) => (props.$rotated ? 180 : 0)}deg);
`;

export const Text = styled.p``;

import styled from "styled-components";

export const DropdownContainer = styled.div`
  position: relative;
`;
export const ButtonDots = styled.div`
  background: none;
`;
export const DropdownMenuStyle = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 70%;
  right: 50%;
  transform: translate(50%, 0);
  background: #f0f0f0;
  border: 1px solid #ccc;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 10;
`;

export const ButtonOption = styled.button`
  background: none;
  border: none;
  padding: 8px 12px;
  text-align: center;
  cursor: pointer;

  &:hover {
    background: #f0e21e;
  }
`;

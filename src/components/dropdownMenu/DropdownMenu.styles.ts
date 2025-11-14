import styled from "styled-components";

export const DropdownContainer = styled.div`
  position: relative;
`;

interface ButtonTriggerProps {
  imgWidth?: string;
  imgHeight?: string;
}
export const ButtonTrigger = styled.div<ButtonTriggerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 184px;
  height: 48px;
  border-radius: 10px;
  cursor: pointer;
  gap: 24px;
  &:hover {
    background: #e6e6e6;
  }
  img {
    width: ${(props) => props.imgWidth};
    height: ${(props) => props.imgHeight};
  }
`;

interface DropdownContainerProps {
  width?: string;
  size?: "small" | "medium";
}
export const DropdownMenuStyle = styled.div<DropdownContainerProps>`
  position: absolute;
  background-color: red !important;
  display: flex;
  flex-direction: column;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: #f0f0f0;
  border: 1px solid #ccc;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 10;
  max-height: 135px;
  overflow-y: auto;
  width: ${(props) => (props.size === "small" ? "184px" : "408px")};
`;

export const ButtonOption = styled.button`
  background: none;
  color: black;
  border: none;
  padding: 10px 9px;
  font-size: 12px;
  text-align: center;
  cursor: pointer;
  &:hover {
    background: #f0e21e;
  }
`;

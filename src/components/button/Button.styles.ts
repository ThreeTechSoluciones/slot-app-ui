import styled from "styled-components";

export const StyledButton = styled.button<{
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary";
}>`
  border: none;
  padding: 0;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 500;
  width: ${({ size }) =>
    size === "small" ? "104px" : size === "medium" ? "192px" : "412px"};
  height: ${({ size }) =>
    size === "small" ? "48px" : size === "medium" ? "48px" : "56px"};
  font-size: ${({ size }) =>
    size === "small" ? "12px" : size === "medium" ? "12px" : "16px"};

  background-color: ${({ variant }) =>
    variant === "primary" ? "#F0E21E" : "#000000"};
  color: ${({ variant }) => (variant === "primary" ? "#000000" : "#fff")};

  &:hover {
    opacity: 0.9;
    background-color: #7c7c7c;
  }
`;
export const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100%;
`;

export const ButtonIcon = styled.span`
  position: absolute;
  right: 18px;
`;

export const ButtonText = styled.span`
  display: inline-block;
  text-align: center;
`;

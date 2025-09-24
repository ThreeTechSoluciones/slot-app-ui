import styled from "styled-components";

export const StyledButton = styled.button<{
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary";
}>`
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 500;

  padding: ${({ size }) =>
    size === "small" ? "4px 8px" : size === "large" ? "12px 24px" : "8px 16px"};

  font-size: ${({ size }) =>
    size === "small" ? "12px" : size === "large" ? "16px" : "14px"};

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
`;

export const ButtonIcon = styled.span`
  margin-right: 8px;
`;

export const ButtonText = styled.span``;

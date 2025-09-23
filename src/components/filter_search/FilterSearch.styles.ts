import styled from "styled-components";

export const FilterDiv = styled.div`
  display: inline-block;
  margin-left: 80px;
  position: relative;
`;

export const FilterInputStyled = styled.input`
  width: 280px;
  height: 24px;
  padding: 0.5rem;
  padding-right: 2rem;
  background-color: #f0f0f0;
  border-radius: 10px;
  color: black;
  border: #f0f0f0;
  &:focus {
    outline: none;
    border: 1px solid white;
    box-shadow: 0 0 3px #cccccce4;
  }

  &::placeholder {
    color: black;
  }
`;
export const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  pointer-events: none;
`;

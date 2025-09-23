import styled from "styled-components";

export const FilterContainer = styled.div`
  display: inline-flex;
  margin-left: 80px;
  position: relative;
`;

export const DropdownWrapper = styled.div`
  background-color: #f0f0f0;
  border-radius: 10px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    box-shadow: 0 0 3px #cccccce4;
  }
`;

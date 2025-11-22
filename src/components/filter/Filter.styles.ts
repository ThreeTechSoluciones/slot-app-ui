import styled from "styled-components";
import { BORDER_RADIUS, SECONDARY_COLOR } from "../../utils/Stylesheet";

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DropdownWrapper = styled.div`
  width: 184px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${BORDER_RADIUS};
  font-size: 12px;
  background-color: ${SECONDARY_COLOR};
`;

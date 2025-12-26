import styled from "styled-components";
import {
  BORDER_RADIUS,
  SECONDARY_COLOR,
  FONT_FAMILY,
  TERTIARY_COLOR,
  TEXT_COLOR,
} from "../../utils/Stylesheet";
interface DropdownWrapperProps {
  $hasValue: boolean;
}
export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DropdownWrapper = styled.div<DropdownWrapperProps>`
  width: 184px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${BORDER_RADIUS};
  font-size: 12px;
  font-family: ${FONT_FAMILY};
  color: ${TERTIARY_COLOR};
  background-color: ${SECONDARY_COLOR};
  color: ${(props) => (props.$hasValue ? TEXT_COLOR : TERTIARY_COLOR)};
`;

import styled from 'styled-components';
import {
  BORDER_RADIUS,
  LIGHT_NEUTRAL_COLOR,
  NEUTRAL_COLOR,
  DEFAULT_TEXT_COLOR,
} from '../../utils/Stylesheet';

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
  font-size: 14px;
  color: ${NEUTRAL_COLOR};
  background-color: ${LIGHT_NEUTRAL_COLOR};
  color: ${(props) => (props.$hasValue ? DEFAULT_TEXT_COLOR : NEUTRAL_COLOR)};
`;

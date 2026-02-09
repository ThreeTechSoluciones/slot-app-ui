import styled from "styled-components";
import {
  BORDER_RADIUS,
  DEFAULT_TEXT_COLOR,
  FONT_FAMILY,
  LIGHT_NEUTRAL_COLOR,
  NEUTRAL_COLOR
}
  from "../../utils/Stylesheet";

export const FilterDiv = styled.div`
  position: relative;
  width:100%;
  background-color: ${LIGHT_NEUTRAL_COLOR};
  padding-left: 16px;
  border-radius:${BORDER_RADIUS};
  display: inline-block;
`;

export const FilterInputStyled = styled.input`
  width: 100%;
  height: 100%;
  color:${DEFAULT_TEXT_COLOR};
  font-family:${FONT_FAMILY};
  border:none;
  background-color: transparent;
  font-size: 12px;
  &:focus {
    outline: none;
    box-shadow: none;  
  }
  &::placeholder {
    color: ${NEUTRAL_COLOR};
    font-family:${FONT_FAMILY};
  }
`;

export const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  right:8%;
  transform: translateY(-50%);
  pointer-events: none;
`;

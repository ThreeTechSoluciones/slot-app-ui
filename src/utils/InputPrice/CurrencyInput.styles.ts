import styled from "styled-components";
import {
  FONT_FAMILY,
  LIGHT_NEUTRAL_COLOR,
  NEUTRAL_COLOR,
  DEFAULT_TEXT_COLOR,
} from "../Stylesheet";

type PriceInputProps = {
  width: string;
};

export const PriceInput = styled.input<PriceInputProps>`
  width: ${(props) => props.width};
  box-sizing: border-box;
  height: 56px;
  padding: 0 16px;
  line-height: 56px;
  border-radius: 10px;
  font-size: 16px;
  color: ${DEFAULT_TEXT_COLOR};
  font-family: ${FONT_FAMILY};

  background: ${(props) => (props.disabled ? LIGHT_NEUTRAL_COLOR : "none")};
  border: ${(props) =>
    props.disabled ? LIGHT_NEUTRAL_COLOR : "1px solid black"};
  &::placeholder {
    color: ${(props) => (props.disabled ? LIGHT_NEUTRAL_COLOR : NEUTRAL_COLOR)};
  }
`;

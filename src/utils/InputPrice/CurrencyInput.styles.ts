import styled from "styled-components";
import { FONT_FAMILY, LIGHT_NEUTRAL_COLOR, NEUTRAL_COLOR, DEFAULT_TEXT_COLOR } from "../Stylesheet";

type PriceInputProps = {
  width: string;
};

export const PriceInput = styled.input <PriceInputProps>`
    width: ${(props) => props.width}px;
    height: 56px;
    border-radius:10px;
    font-size:12px;
    padding-left:16px;
    color:${DEFAULT_TEXT_COLOR};
    font-family: ${FONT_FAMILY};
    &::placeholder {
        color: ${NEUTRAL_COLOR};
    }
    background:${(props) => (props.disabled ? LIGHT_NEUTRAL_COLOR : "none")};
    border:${(props) => (props.disabled ? LIGHT_NEUTRAL_COLOR : "1px solid black")};
    &::placeholder {
        color: ${(props) => (props.disabled ? LIGHT_NEUTRAL_COLOR : NEUTRAL_COLOR)};;
    }
`   

import styled from "styled-components";
import { FONT_FAMILY, SECONDARY_COLOR, TERTIARY_COLOR, TEXT_COLOR } from "../Stylesheet";

type PriceInputProps = {
  width: string;
};

export const PriceInput=styled.input <PriceInputProps>`
    width: ${(props) => props.width}px;
    height: 56px;
    border-radius:10px;
    font-size:12px;
    padding-left:16px;
    color:${TEXT_COLOR};
    font-family: ${FONT_FAMILY};
    &::placeholder {
        color: ${ TERTIARY_COLOR};
    }
    background:${(props) => (props.disabled ? SECONDARY_COLOR: "none")};
    border:${(props) => (props.disabled ? SECONDARY_COLOR: "1px solid black")};
    &::placeholder {
        color: ${(props) => (props.disabled ? SECONDARY_COLOR: TERTIARY_COLOR)};;
    }
`   
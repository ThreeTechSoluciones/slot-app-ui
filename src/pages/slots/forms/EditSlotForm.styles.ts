import styled from "styled-components";
import { FONT_FAMILY } from "../../../utils/Stylesheet";
import { TEXT_COLOR, BORDER_RADIUS, BACKGROUND_COLOR } from "../../../utils/Stylesheet";

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;  
`;

export const Input = styled.input`
    width: 396px;
    height: 56px;
    border:1px solid black;
    border-radius:${BORDER_RADIUS};
    font-size:12px;
    padding-left:16px;
    color:${TEXT_COLOR};
    background-color: ${BACKGROUND_COLOR};
    font-family: ${FONT_FAMILY};
    &::placeholder {
        color: ${TEXT_COLOR};
    }
`;

export const Label = styled.label`
    font-size: 16px;
    font-family: ${FONT_FAMILY};
`;

export const InputContainer = styled.div`
    display: flex;  
    flex-direction: column;
    gap:8px;
`;



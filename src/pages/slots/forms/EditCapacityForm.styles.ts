import styled from "styled-components";
import { FONT_FAMILY, TERTIARY_COLOR } from "../../../utils/Stylesheet";
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
        color: ${TERTIARY_COLOR};
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

export const Button = styled.button`
    width: 100px;
    height: 40px;
    margin-top: 16px;
    border-radius: ${BORDER_RADIUS};
    background-color: ${TEXT_COLOR};
    color: white;
    font-family: ${FONT_FAMILY};
    border: none;
    cursor: pointer;
`;


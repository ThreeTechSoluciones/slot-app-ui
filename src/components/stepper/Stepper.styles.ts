import styled from "styled-components";
import { FONT_FAMILY, PRIMARY_COLOR, TERTIARY_COLOR } from "../../utils/Stylesheet";

export const MainContainer=styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;

    
`
export const Title=styled.h1`
    font-size: 24px;
    font-family: ${FONT_FAMILY};
    font-weight:bold;
    margin-left:80px;

`
export const StepperContainer = styled.div`
    display:flex;
    flex-direction: row;
    justify-content:center;
    align-items:center;
    margin-top:32px;
    gap:64px;
    margin-bottom:16px;
    
`
export const ButtonsContainer=styled.div`
    display: flex;  
    gap: 24px;
    margin-top:32px;
    margin-bottom: 32px;
 `
export const Button=styled.button`
    width:192px;
    height: 48px;
    background:${PRIMARY_COLOR};
    font-family: ${FONT_FAMILY};
    border-radius:10px;
    border:none;
    font-size:12px;
    color:black;
    &:hover{
        cursor:pointer;
        background: ${TERTIARY_COLOR};
`

export const FormContainer = styled.div`
    width:100%;

`
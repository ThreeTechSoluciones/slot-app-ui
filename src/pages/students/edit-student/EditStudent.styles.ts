import styled from "styled-components";
import { FONT_FAMILY, PRIMARY_COLOR, TERTIARY_COLOR } from "../../../utils/Stylesheet";

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%; 
    
`;

export const Title = styled.h1`
    font-size: 24px;
    margin-right:80px;
    margin-top: 32px;
    font-family: ${FONT_FAMILY};
    font-weight:bold;
    display:flex;
    align-items:center;
`
export const TitleContainer = styled.div`
    width: calc(100% - 80px);
    margin-left:80px;
    
`
export const ButtonsContainer = styled.div`
    display: flex;  
    gap: 24px;
    margin-top:32px;
    margin-bottom: 32px;
 `
export const Button = styled.button`
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
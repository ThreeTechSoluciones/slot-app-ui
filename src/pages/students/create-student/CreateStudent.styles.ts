import styled from "styled-components";
import { FONT_FAMILY } from "../../../utils/Stylesheet";

export const Title=styled.h1`
    font-size: 24px;
    margin-right:80px;
    margin-top: 32px;
    font-family: ${FONT_FAMILY};
    font-weight:bold;
`
export const TitleContainer=styled.div`
    width: 100%;
    margin-left:80px;
`
export const MainContainer=styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    align-items:left;
`
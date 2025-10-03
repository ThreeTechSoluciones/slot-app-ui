import styled from "styled-components";
import { FONT_FAMILY, SUCCESS_COLOR } from "../../utils/Stylesheet";

interface CircleProps {
    isCurrentStep?:boolean;
    isBackStep?:boolean;
    isLast?:boolean;
}

export const MainContainer = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:8px;   
`
export const Circle =styled.div<CircleProps>`
    background-color: ${(props) =>
    props.isCurrentStep
      ? "black"
      : props.isBackStep
      ? SUCCESS_COLOR
      : "white"};
    border: ${(props) =>
    props.isCurrentStep
      ? "1px solid black"
      : props.isBackStep
      ? `1px solid ${SUCCESS_COLOR}`
      : "2px solid black"};
    color: ${(props) =>
        props.isCurrentStep? "white"
      : props.isBackStep? "white"
      : "black"};
    width:40px;
    height:40px;
    max-width:40px;
    border-radius:50%;
    margin:0px;
    padding:0px;
    display:flex;
    text-align:center;
    align-items:center;
    justify-content:center;
    position:relative;
    font-family: ${FONT_FAMILY};
`;

export const Title = styled.p`
    margin:0px;
    padding:0px;
    font-family: ${FONT_FAMILY};
    font-size:12px;
    max-width:60px;
    display:flex;
    text-align:center;
`
export const Step = styled.p`
    margin:0px;
    padding:0px;
    color:white;
    font-family: ${FONT_FAMILY};
    position: relative;
`
export const Img = styled.img`
    position: absolute;
    top:140px;
`
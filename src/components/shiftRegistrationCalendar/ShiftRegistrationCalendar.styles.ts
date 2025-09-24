import styled from "styled-components";
import { BORDER_RADIUS, 
        FONT_FAMILY, 
        SECONDARY_COLOR, 
        SUCCESS_COLOR, 
       } from "../../utils/Stylesheet";

interface HourProps  {
    isAvailable?: boolean;
    isUnavailable?: boolean;
}

export const MainContainer = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    border-left:5px solid ${SECONDARY_COLOR};
    border-bottom:5px solid ${SECONDARY_COLOR};
    margin-top:32px;
    margin-bottom:32px;
    max-height: 20vw;     
    overflow-x: auto; 
    border-radius: ${BORDER_RADIUS}; 
`  

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    gap:16px;
    align-items:center;
    border-right:5px solid ${SECONDARY_COLOR};
    padding-bottom:20px; 
`   

export const Day = styled.p`
    display: flex;
    height: 32px;
    width: 120px;
    justify-content: center;
    align-items: center;    
    margin: 0px;
    padding: 0px;
    font-size: 16px;
    font-weight: bold;
    color: black;
    background-color:${SECONDARY_COLOR};
    font-family: ${FONT_FAMILY};
`
export const Hour = styled.button<HourProps>`
    display:flex;   
    width: 72px;
    height:28px;
    border-radius:${BORDER_RADIUS};
    font-family: ${FONT_FAMILY};
    justify-content:center;
    align-items:center;
    text-align:Center;
    justify-content:center;
    items-align:center;
    color:black;
    background-color:${(props)=>
        props.isAvailable? `white` : SECONDARY_COLOR};
    border:${(props)=>
        props.isAvailable?`solid 2px ${SUCCESS_COLOR}`
        :props.isUnavailable?`solid 2px ${SECONDARY_COLOR}`
        :"none"};
    &:hover {
        cursor: ${(props) => (props.isAvailable ? "pointer" : "default")};
    }           
`


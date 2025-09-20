import styled from "styled-components";
import { FONT_FAMILY, SECONDARY_COLOR, SUCCESS_COLOR } from "../../utils/Stylesheet";


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
margin-top: 0px;
    margin-bottom: 0px;
    padding: 0px;
    font-size: 16px;
    font-weight: bold;
    color: black;
    background-color:${SECONDARY_COLOR};
    family-font= ${FONT_FAMILY};
`
export const Hora = styled.button`
display:flex;   
width: 72px;
    height:28px;
    border-radius:10px;
    justify-content:center;
    align-items:center;
    border:solid 2px ${SUCCESS_COLOR};
    text-align:Center;
    justify-content:center;
    items-align:center;
    color:black;
    background-color: white;
    family-font=${FONT_FAMILY};
    &:hover{   
            cursor:pointer;
           
`


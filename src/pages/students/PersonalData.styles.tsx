import styled from "styled-components";
import { PRIMARY_COLOR, SECONDARY_COLOR, TERCIARY_COLOR,TEXT_COLOR } from "../../utils/Stylesheet"; "../../utils/Stylesheet";

export const MainContainer=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 1024px;
    margin-top: 32px; 
    font-family:'Roboto', sans-serif; 
`
export const FormContainer=styled.form`
    display: flex;
    flex-direction: column;
`
export const Input=styled.input<{ disabled?: boolean }>`
    width:392px;
    height: 56px;
    border-radius:10px;
    background:${(props) => (props.disabled ? SECONDARY_COLOR: "none")};
    border:${(props) => (props.disabled ? SECONDARY_COLOR: "1px solid black")};
    color:black;
    font-size:12px;
    padding-left:16px;
    &:: placeholder {
        color: ${(props) => (props.disabled ? SECONDARY_COLOR: "black")};;
`

export const InputDate=styled(Input)`
    width:376px;
    padding-right:16px;
     font-family: 'Roboto', sans-serif;
    
`

export const Description=styled.textarea`
    width:392px;
    height:108px;
    border-radius:10px;
    background:none;
    border:1px solid black;
    color:${TEXT_COLOR};
    font-size:12px;
    padding-left:16px;
    padding-top:16px;
    font-family: 'Roboto', sans-serif;
`

export const Title=styled.h1`
    font-size: 24px;
    margin-right:80px;;
    `

export const ButtonsContainer=styled.div`
    display: flex;  
    gap: 24px;
    margin-top:32px;
    `
export const TitleContainer=styled.div`
    width: 100%;
    margin-left:80px;
    `


export const ErrorMessage=styled.p`
    color:white;
    font-size:11px;
    margin:0px;
    padding-top:5px;
    display:flex;
    justify-content:center;
    text-align:center;
    align-items:center;
` 
export const Label=styled.p`
    font-size: 16px;
    font-weight: bold;
    margin-top:8px;
    margin-bottom:8px;
    padding:0px;
` 
export const Button=styled.button`
    width:192px;
    height: 48px;
    background:${PRIMARY_COLOR};
    border-radius:10px;
    border:none;
    font-size:12px;
    color:black;
    &:hover{
        cursor:pointer;
        background: ${TERCIARY_COLOR};
`

export const Select=styled.select`
    width:408px;
    height: 56px;
    border-radius:10px;
    background:none;
    border:1px solid black;
    color:black;
    font-size:12px;
    padding-left:16px;
    padding-right:16px;
`

import styled from "styled-components";

export const MainContainer=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 1024px;
    margin-top:64px;
`
    

export const Button=styled.button`
    width:192px;
    height: 48px;
    background: #F0E21E;
    border-radius:10px;
    border:none;
    font-size:12px;
    color:black;
`


export const FormContainer=styled.form`
    display: flex;
    flex-direction: column;
    gap: 32px;
`
export const Input=styled.input`
    width:392px;
    height: 56px;
    border-radius:10px;
    background:none;
    border:1px solid black;
    color:black;
    font-size:12px;
    padding-left:16px;
`

export const InputDate=styled.input`
width:372px;
    height: 56px;
    border-radius:10px;
    background:none;
    border:1px solid black;
    color:black;
    padding-left:16px;
    padding-right:16px;
`
export const Description=styled.input`
    width:392px;
    height: 32px;
    border-radius:10px;
    background:none;
    border:1px solid black;
    color:black;
    font-size:12px;
    padding-left:16px;
    padding-bottom:98px;
`

export const Title=styled.h1`
    font-size: 24px;
    margin-right:80px;;
    `

export const ButtonsContainer=styled.div`
    display: flex;  
    gap: 24px;
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
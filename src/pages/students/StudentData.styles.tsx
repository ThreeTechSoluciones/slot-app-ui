import styled from "styled-components";
import { PRIMARY_COLOR, 
        SECONDARY_COLOR, 
        TERTIARY_COLOR,
        TEXT_COLOR, 
        FONT_FAMILY } 
    from "../../utils/Stylesheet"; 

export const MainContainer=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 100vh;
`
export const FormContainer=styled.form`
    display: flex;
    flex-direction: column;
`
export const BaseStyle = styled.input`
    width:392px;
    height: 56px;
    border: 1px solid black;
    border-radius:10px;
    font-size:12px;
    padding-left:16px;
    background:none;
    color:${TEXT_COLOR};
    font-family: ${FONT_FAMILY};
    &::placeholder {
        color: ${ TERTIARY_COLOR};
`
export const Input = styled(BaseStyle)<{ disabled?: boolean }>`
    background:${(props) => (props.disabled ? SECONDARY_COLOR: "none")};
    border:${(props) => (props.disabled ? SECONDARY_COLOR: "1px solid black")};
    &::placeholder {
        color: ${(props) => (props.disabled ? SECONDARY_COLOR: TERTIARY_COLOR)};;
`

export const InputDate=styled(BaseStyle)`
    width:376px;
    padding-right:16px;
    color: ${TERTIARY_COLOR}
`

export const Description = styled(BaseStyle).attrs({ as: "textarea" })`
    width:392px;
    height:108px;
    padding-top:16px;
`

export const Title=styled.h1`
    font-size: 24px;
    margin-right:80px;
    margin-top: 32px;
    font-family: ${FONT_FAMILY}
    `

export const ButtonsContainer=styled.div`
    display: flex;  
    gap: 24px;
    margin-top:32px;
    margin-bottom: 32px;
    `
export const TitleContainer=styled.div`
    width: 100%;
    margin-left:80px;
    `
export const Label=styled.p`
    font-size: 16px;
    font-weight: bold;
    margin-top:8ipx;
    margin-bottom:8px;
    padding:0px;
    font-family: ${FONT_FAMILY};
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
    }
`


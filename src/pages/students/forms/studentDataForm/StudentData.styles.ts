import styled from "styled-components";
import {
    BRAND_COLOR,
    LIGHT_NEUTRAL_COLOR,
    NEUTRAL_COLOR,
    DEFAULT_TEXT_COLOR,
    FONT_FAMILY
}
    from "../../../../utils/Stylesheet";

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    
`
export const FormContainer = styled.form`
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
    color:${DEFAULT_TEXT_COLOR};
    font-family: ${FONT_FAMILY};
    &::placeholder {
        color: ${NEUTRAL_COLOR};
`
export const Input = styled(BaseStyle) <{ disabled?: boolean }>`
    background:${(props) => (props.disabled ? LIGHT_NEUTRAL_COLOR : "none")};
    border:${(props) => (props.disabled ? LIGHT_NEUTRAL_COLOR : "1px solid black")};
    &::placeholder {
        color: ${(props) => (props.disabled ? LIGHT_NEUTRAL_COLOR : NEUTRAL_COLOR)};;
`
export const Description = styled(BaseStyle).attrs({ as: "textarea" })`
    width:392px;
    height:108px;
    padding-top:16px;
`
export const ButtonsContainer = styled.div`
    display: flex;  
    gap: 24px;
    margin-top:32px;
    margin-bottom: 32px;
    `
export const Label = styled.p`
    font-size: 16px;
    font-weight: bold;
    margin-top:8ipx;
    margin-bottom:8px;
    padding:0px;
    font-family: ${FONT_FAMILY};
`
export const Button = styled.button`
    width:192px;
    height: 48px;
    background:${BRAND_COLOR};
    font-family: ${FONT_FAMILY};
    border-radius:10px;
    border:none;
    font-size:12px;
    color:black;
    &:hover{
        cursor:pointer;
        background: ${NEUTRAL_COLOR};
    }
`
export const InputDateContainer = styled.div`
    width:408px;
`


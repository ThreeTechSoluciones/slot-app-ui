import styled from "styled-components";
import { BORDER_RADIUS,
        FONT_FAMILY, 
        TERTIARY_COLOR, 
        TEXT_COLOR } 
    from "../../utils/Stylesheet";

export const MainContainer = styled.div`
    display:flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    min-height: 100vh; 
    overflow-y: auto;
`

export const Title = styled.h1`
    font-family: ${FONT_FAMILY};
    font-size: 24px;
    margin:0px;
`
export const Logo = styled.div`
    width: 120px;
    height: 122px;
    margin-top:40px;
    border-radius: 50%;
    overflow: hidden;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: filter 0.3s ease-in-out;
        transition: transform 0.3s ease-in-out;
    }
    img:hover {
        filter: drop-shadow(0px 0px 8px #F0E21E);
        transform: scale(1.05);
    }
`
export const Form=styled.form`
    display:flex;
    flex-direction:column;
    gap:8px;
    font-family:${FONT_FAMILY};
`
export const Label= styled.label`
    font-size: 16px;
    font-weight: bold;
    margin-top:8px;
    margin-bottom:8px;
    padding:0px;
`

export const InputContainer = styled.div`
    display:flex;
    flex-direction: row;
    align-items:center;
    position:relative;
`

export const Input = styled.input`
    width:392px;
    height: 56px;
    border: 1px solid black;
    border-radius:${BORDER_RADIUS};
    font-size:12px;
    padding-left:16px;
    background:white;
    color:${TEXT_COLOR};
    font-family:${FONT_FAMILY};
    &::placeholder {
        color:${TERTIARY_COLOR}; 
        font-family:${FONT_FAMILY};
    }
    &:focus {
        outline: none;
        background: none;
    }
`
interface ImgProps {
    isInteractive?:boolean
}

export const Img=styled.img<ImgProps>`
        position:absolute;
        right:24px;  
    ${({ isInteractive }) =>
      isInteractive &&
      `
        &:hover {
          cursor: pointer;
        }
      `}
`

export const Button = styled.button`
    margin-top:24px;
    width:412px;
    height: 56px;
    background-color:#F0E21E;
    border-radius:10px;
    border:none;
    font-size:12px;
    color:black;
    font-family:${FONT_FAMILY};
    &:hover{
        cursor:pointer;
        background: ${TERTIARY_COLOR};
    }
`



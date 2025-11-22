import styled from "styled-components";
import { BORDER_RADIUS, FONT_FAMILY, TERTIARY_COLOR, PRIMARY_COLOR, TEXT_COLOR, SECONDARY_COLOR } from "../../utils/Stylesheet";
import Arrow from "../../assets/Arrow.png";


export const ScreenContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 520px;
    padding-top: 32px;
    padding-bottom: 32px;
    gap:24px;
    border: 2px solid ${TERTIARY_COLOR};
    border-radius: ${BORDER_RADIUS};
`;

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    
`

export const InputContainer = styled.div`
    display: flex;  
    flex-direction: column;
    gap:16px;
`;

export const EditContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 316px;
`;
export const Label = styled.label`
    font-size: 16px;
    font-family: ${FONT_FAMILY};
   
`;

export const BaseStyle = styled.input`
    width:300px;
    height: 48px;
    border-radius:${BORDER_RADIUS};
    font-size:12px;
    padding-left:16px;
    color:${TEXT_COLOR};
    font-family: ${FONT_FAMILY};
`;

export const Input = styled(BaseStyle)`
    background-color:${SECONDARY_COLOR}; 
    border:none;    
    &::placeholder {
        color: ${TEXT_COLOR};
    }
`;

export const Select = styled(BaseStyle).attrs({ as: "select" })`
    width:316px;
    border:1px solid black;
    appearance: none;      
    webkit-appearance: none;
    moz-appearance: none;
    background: url(${Arrow}) no-repeat right 12px center;
    padding-right: 32px; 
`;

interface ButtonProps {
    $isDisabled?: boolean;
}

export const Button = styled.button<ButtonProps>`
    display: flex;                 
    align-items: center;           
    justify-content: center;       
    gap: 8px;
    width:316px;
    height: 48px;
    background:${(props) => (props.$isDisabled ? SECONDARY_COLOR : PRIMARY_COLOR)};
    font-family: ${FONT_FAMILY};
    border-radius:${BORDER_RADIUS};
    border:none;
    font-size:12px;
    color:${TEXT_COLOR};
    &:hover {
        ${props => !props.$isDisabled && `
            cursor: pointer;
            background: ${TERTIARY_COLOR};
        `}
    }
`;

export const EditCapacity = styled.button`
    display: flex;
    align-items: center;
    font-size: 16px;
    color: ${TEXT_COLOR};
    font-family: ${FONT_FAMILY};
    background: none;
    border: none;
    text-decoration: underline; 
    &:hover {
        cursor: pointer;    
    }
    img {
        margin-left: 8px;
        margin-top: 4px;
    }
`
export const Title = styled.h1`
    font-size: 24px;
    margin-right:80px;
    margin-top:32px;
    font-family: ${FONT_FAMILY};
    font-weight:bold;
    display:flex;
    align-items:center;
    img {
        padding-right:24px;
  }
`
export const TitleContainer = styled.div`
    width: calc(100% - 80px);
    margin-left:80px;
    
`
    ;

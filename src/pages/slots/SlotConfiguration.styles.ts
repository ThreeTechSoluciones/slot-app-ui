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
    width: 100%;
    min-height: 100vh;
    margin: 0px;
`;

export const SkeletonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start; /* Cambia a flex-start para mejor alineación */
    flex: 1; /* Ocupa el espacio restante */
    gap: 32px;
    padding: 40px 20px; /* Añade padding */
    
    > * {
        flex-shrink: 0; /* Evita que se compriman */
    }
`;

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
   
    font-family: ${FONT_FAMILY};
    font-weight:bold;
    display:flex;
    align-items:center;
      margin-left:0px;
    margin-top:32px;
   
`
export const TitleContainer = styled.div`
   
    margin-left:80px;
    
`
    ;

export const SlotsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 520px;
    min-height: 336px;
    border: 2px solid ${TERTIARY_COLOR};
    border-radius: ${BORDER_RADIUS};
    gap:4px;
     max-height: 572px; /* Define una altura máxima */
    overflow-y: auto; /* Activa el scroll vertical */
    



`;
export const TitlesContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-right:300px;
    gap:2px;
    font-family: ${FONT_FAMILY};
  
`;
export const MainTitle = styled.h1`
    font-size: 16px;
    font-weight: bold;
    margin:0px;
    margin-top:32px;
   
`;
export const Subtitle = styled.h2`
    font-size: 12px;
    
     margin:0px;
`;

export const SpecificSlotContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 456px;
    height: 56px;
    gap:2px;
    border-bottom: 1px solid ${TEXT_COLOR};
    img{
        margin-top:16px;
        margin-right:16px;
    }
  
`;

export const SlotInfoContainer = styled.div`
display: flex;
flex-direction: column;
  
`;

export const SlotInfo1 = styled.p`
    font-size: 16px;
    color: #333;
    margin:0px;
    padding:0px;
    font-family: ${FONT_FAMILY};
      margin-top:8px;
   
`;

export const SlotInfo = styled.p`
    font-size: 12px;
    color: #333;
    margin:0px;
    padding:0px;
    font-family: ${FONT_FAMILY};
  
  
`;

export const ActionsContainer = styled.div`
    display: flex; 
    flex-direction: row;
    margin-left: auto;
    gap:24px;
`;


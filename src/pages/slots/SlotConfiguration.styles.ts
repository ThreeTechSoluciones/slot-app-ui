import styled, { keyframes } from "styled-components";
import { BORDER_RADIUS, FONT_FAMILY, TERTIARY_COLOR, PRIMARY_COLOR, TEXT_COLOR, SECONDARY_COLOR, FONT_WEIGHT_BOLD, FONT_WEIGHT_NORMAL } from "../../utils/Stylesheet";
import Arrow from "../../assets/Arrow.png";

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    margin: 0px;
`;
export const Title = styled.h1`
    font-size: 24px;
    font-family: ${FONT_FAMILY};
    display:flex;
    margin-top:32px;
    margin-left:80px;  
`
export const SkeletonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start; 
    gap: 32px;
`;

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
export const SlotsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 520px;
    min-height: 336px;
    border: 2px solid ${TERTIARY_COLOR};
    border-radius: ${BORDER_RADIUS};
    gap:8px;
    max-height: 512px; 
    overflow-y: auto; 
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
    font-weight: 700;
   
`;
export const Subtitle = styled.h2`
    font-size: 12px;
    margin:0px;
    font-weight: 500;
`;
interface SpecificSlotContainerProps {
    $isLast?: boolean;
}
export const SpecificSlotContainer = styled.div<SpecificSlotContainerProps>`
    display: flex;
    flex-direction: row;
    width: 456px;
    height: 56px;
    gap:2px;
    border-bottom: ${(props) => (props.$isLast ? "none" : `1px solid ${TEXT_COLOR}`)};
    margin-bottom: ${(props) => (props.$isLast ? "8px" : "none")};
    img{
        margin-top:16px;
        margin-right:16px;
    } 
       &:hover{
        cursor: pointer;
        transform: scale(1.02);
        transition: all 0.2s ease;
    }
`;

export const SlotInfoContainer = styled.div`
    display: flex;
    flex-direction: column;

`;

interface SlotInfoProps {
    $isDown?: boolean;
    $isBold?: boolean;
}

export const SlotInfo = styled.p<SlotInfoProps>`
    color: ${TEXT_COLOR};
    font-family: ${FONT_FAMILY};
    margin-top:${(props) => (props.$isDown ? "0px" : "8px")};
    margin-bottom:${(props) => (props.$isDown ? "4px" : "0px")};
    font-weight: ${(props) => (props.$isBold ? FONT_WEIGHT_BOLD : FONT_WEIGHT_NORMAL)};
    font-size:${(props) => (props.$isDown ? "12px" : "16px")};  
`;


export const ActionsContainer = styled.div`
    display: flex; 
    flex-direction: row;
    margin-left: auto;
    gap:24px;
     &:hover{
        cursor:pointer;
    }
`;

export const InfoContainer = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    margin-top:8px;
    margin-bottom:32px;
    img{
    background-color: ${SECONDARY_COLOR};
    border-radius:50%;
    padding:4px;
    }
`
export const fadeInSlide = keyframes`
  from {
    opacity: 0;
    transform: translateY(-80px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const AnimatedContainer = styled.div`
  animation: ${fadeInSlide} 1.2s ease-out;
`;



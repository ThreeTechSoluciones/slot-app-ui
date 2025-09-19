import styled from "styled-components";
import { BORDER_RADIUS, 
        FONT_FAMILY, 
        SECONDARY_COLOR, 
        TEXT_COLOR } 
    from "../../utils/Stylesheet";


export const ShiftDetailContainer = styled.div `
    width:100%;
    height:172px;
    border: 5px solid ${SECONDARY_COLOR};
    display:flex;
    flex-direction: column;
    border-radius:${BORDER_RADIUS};
    gap:16px;  
`

export const Title = styled.h2 `
    font-family: ${FONT_FAMILY};
    font-size:16px;
    display:flex;
    flex-direction:row;
    align-items:center;
    gap:10px;
    margin-left:32px;
    
`
export const ShiftContainer = styled.div`
    display:flex;
    flex-direction:row;
    gap:24px;
    margin-left:32px;
`
export const Shift = styled.div`
    display:flex;
    flex-direction:column;
    background-color: ${SECONDARY_COLOR};
    color: ${TEXT_COLOR};
    width:140px;
    height:56px;
    border-radius:${BORDER_RADIUS};
    border: 1px solid ${SECONDARY_COLOR};
    padding-top:16px;
`

export const Text1 = styled.p`
    margin: 0 0 0 16px;
    padding:0px;
    font-family: ${FONT_FAMILY};
    font-size:16px;
`
export const Text2=styled(Text1)`
    font-size:12px;
`
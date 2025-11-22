import styled from "styled-components";

export const MainContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap:32px;
    margin-top:64px;
    width: 100%;
    min-height: 100vh;
    min-width: 1150px; /* 520 + 520 + 32 (gap) + padding */
   
    box-sizing: border-box;
    overflow-x: auto; /* Si la pantalla es muy pequeña, hace scroll horizontal */
    
 
`;
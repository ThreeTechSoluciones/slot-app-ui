import styled from "styled-components";

export const MainContainer = styled.div`
    display:flex; 
    width: 100%;
    min-height: 96px; 
    background-color: #F0E21E;
    box-sizing: border-box;
    justify-content: space-between;
`
export const SecondaryContainer = styled.div`
    display:flex;
    flex-direction: row;
    margin-left:80px;
    min-height:96px;
    align-items: center; 
    font-size:16px;  
`
export const TerciaryContainer = styled(SecondaryContainer)`
  gap:24px;
  margin-right:80px;    
`

export const Options = styled.div`
    width: 172px;
    min-height: 16px; 
    display:flex;
    justify-content:Center;
    text-align:center;
    align-items: center; 
    border-right: 2px solid black;
    &:hover {
      cursor:pointer;
      font-size:17px;
      font-weight:bold;
      transition: font-size 0.3s ease;
`

export const NewStudent = styled(Options)`
    gap:6px;
    border:none;
    img {
    width: 16px;
    height: 16px;
    padding-top:4px;
  }
`

export const Logo = styled.div`
 width: 72px;
  height: 72px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

`

export const Photo= styled(Logo)`
  border: 2px solid black;
`
export const Logout= styled.div`
  width: 88px;
  min-height: 54px; 
  display:flex;
  justify-content:Center;
  text-align:center;
  align-items: center; 
  line-height:16px;
  img {
    width: 32px;
    height: 32px;
  }
  &:hover {
    cursor:pointer;
    font-size:17px;
    font-weight:bold;
    transition: font-size 0.3s ease;
    img {
    width: 34px;
    height: 34px;
  }

`
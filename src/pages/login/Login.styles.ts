import styled from "styled-components";

export const MainContainer = styled.div`
    display:flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
`

export const Title = styled.h1`
`
export const Img = styled.img`
`
export const Form=styled.form`
    display:flex;
    flex-direction:column;
    gap:8px;
`
export const Label= styled.label`
font-size: 16px;
    font-weight: bold;
    margin-top:8ipx;
    margin-bottom:8px;
    padding:0px;
`
export const Input = styled.input`
width:392px;
    height: 56px;
    border: 1px solid black;
    border-radius:10px;
    font-size:12px;
    padding-left:16px;
    background:none;
    color:black;
    &::placeholder {
        color:"#7C7C7C"; 
    }
        
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
    &:hover{
        cursor:pointer;
        background: #7C7C7C};
    }
`
export const InputContainer = styled.div`
    display:flex;
    flex-direction: row;
    align-items:center;
    position:relative;
    img{
        position:absolute;
        right:16px;
        
        }
`
export const Logo = styled.div`
  width: 120px;
  height: 122px;
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
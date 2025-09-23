import PlusIcon from "../../assets/plus-icon.webp";
import LogoCeci from "../../assets/logoCeci.png";
import LogoutIcon from "../../assets/logout.png"
import PerfilPicture from "../../assets/perfil.jpg"
import {MisAlumnos, NuevoAlumno, MisPlanes} from "../../routes/RoutesUtils"
import { MainContainer, 
        LeftOptionsContainer, 
        RightOptionsContainer , 
        Logo,  
        Logout, 
        Photo, 
        Option} from "./header.styles";
import { useNavigate } from "react-router";
import { ConfirmDialog } from "../confirm_dialog/ConfirmDialog";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearUser } from "../../app/slices/AuthSlice";
import toast from "react-hot-toast";

function Header() {

  const dispatch = useDispatch();

  const handleLogout = () => {
    setShowConfirm(false);
    dispatch(clearUser());
    toast.success("Has cerrado sesión con éxito")
  };

  const navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <MainContainer>
      <LeftOptionsContainer>
        <Logo><img src={LogoCeci} alt="Logo" /></Logo>
        <Option>Calendario</Option>
        <Option onClick={()=>navigate(MisAlumnos)}>Mis alumnos</Option>
        <Option onClick={()=>navigate(MisPlanes)}>Mis planes</Option>
        <Option
           isLast 
           hasImg 
           onClick={()=>navigate(NuevoAlumno)}> 
           <p>Nuevo alumno</p> 
          <img src={PlusIcon}/>
        </Option>
      </LeftOptionsContainer>
      <RightOptionsContainer>
        <Logout
          onClick={() => setShowConfirm(true)}>
          <img src={LogoutIcon}/>
          Cerrar sesión
        </Logout>   
        <Photo>  
          <img src={PerfilPicture} alt="Foto de perfil" />
        </Photo>
      </RightOptionsContainer>
      {showConfirm && (
        <ConfirmDialog
          message="¿Estás seguro de que quieres cerrar sesión?"
          onConfirm={handleLogout}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </MainContainer>
    )
};
export default Header;

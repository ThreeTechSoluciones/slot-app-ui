import useAuthentication from "../../hooks/useAuthentication";
import PlusIcon from "../../assets/plus-icon.webp";
import LogoCeci from "../../assets/logoCeci.png";
import LogoutIcon from "../../assets/logout.png"
import PerfilPicture from "../../assets/perfil.jpg"
import {MisAlumnos, NuevoAlumno, MisPlanes, Login} from "../../routes/routes"
import { MainContainer, 
        SecondaryContainer, 
        TertiaryContainer , 
        Logo,  
        NewStudent, 
        Logout, 
        Photo, 
        Options} from "./header.styles";
import { useNavigate } from "react-router";
import { ConfirmDialog } from "../confirm_dialog/ConfirmDialog";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearUser } from "../../app/slices/AuthSlice";

function Header() {

  const dispatch = useDispatch();
  const { isAuthenticated } = useAuthentication();

  const handleLogout = () => {
    setShowConfirm(false);
    dispatch(clearUser())
    navigate(Login);
  };


  const navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);

  return (
    isAuthenticated && (
    <MainContainer>
      <SecondaryContainer>
        <Logo><img src={LogoCeci} alt="Logo" /></Logo>
        <Options>Calendario</Options>
        <Options onClick={()=>navigate(MisAlumnos)}>Mis alumnos</Options>
        <Options onClick={()=>navigate(MisPlanes)}>Mis planes</Options>
        <NewStudent onClick={()=>navigate(NuevoAlumno)}> <p>Nuevo alumno</p> <img 
              src={PlusIcon}
            /></NewStudent>
      </SecondaryContainer>
      <TertiaryContainer>
        <Logout onClick={() => setShowConfirm(true)}><img 
              src={LogoutIcon}
            />Cerrar sesión</Logout>
            {showConfirm && (
        <ConfirmDialog
          message="¿Estás seguro de que quieres cerrar sesión?"
          onConfirm={handleLogout}
          onCancel={() => setShowConfirm(false)}
        />
      )}
        <Photo>  <img src={PerfilPicture} alt="Foto de perfil" /></Photo>
      </TertiaryContainer>

    </MainContainer>
    )
  )
};
export default Header;

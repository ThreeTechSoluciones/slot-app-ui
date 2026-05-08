import PlusIcon from '../../assets/plus-icon-2.svg';
import LogoCeci from '../../assets/logoCeci.png';
import LogoutIcon from '../../assets/logout.png';
import PerfilPicture from '../../assets/perfil.jpg';
import {
  MisAlumnos,
  NuevoAlumno,
  MisPlanes,
  MisTurnos,
  Calendario,
} from '../../routes/RoutesUtils';
import {
  MainContainer,
  LeftOptionsContainer,
  RightOptionsContainer,
  Logo,
  Logout,
  Photo,
  Option,
  LogoutText,
  Button,
} from './header.styles';
import { useLocation, useNavigate } from 'react-router';
import { ConfirmDialog } from '../confirm_dialog/ConfirmDialog';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../app/slices/AuthSlice';
import toast from 'react-hot-toast';

function Header() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    setShowConfirm(false);
    dispatch(clearUser());
    toast.success('Cerraste sesión');
  };

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <MainContainer>
      <LeftOptionsContainer>
        <Logo>
          <img src={LogoCeci} alt="Logo" />
        </Logo>
        <Option $isActive={pathname === Calendario} onClick={() => navigate(Calendario)}>
          Calendario
        </Option>
        <Option $isActive={pathname === MisAlumnos} onClick={() => navigate(MisAlumnos)}>
          Mis alumnos
        </Option>
        <Option $isActive={pathname === MisPlanes} onClick={() => navigate(MisPlanes)}>
          Mis planes
        </Option>
        <Option $isActive={pathname === MisTurnos} onClick={() => navigate(MisTurnos)}>
          Mis turnos
        </Option>
        <Button $isActive={pathname === NuevoAlumno} onClick={() => navigate(NuevoAlumno)}>
          Nuevo alumno
          <img src={PlusIcon} height="22" width="22" />
        </Button>
      </LeftOptionsContainer>
      <RightOptionsContainer>
        <Logout onClick={() => setShowConfirm(true)}>
          <img src={LogoutIcon} />
          <LogoutText>
            Cerrar
            <br />
            sesión
          </LogoutText>
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
  );
}
export default Header;

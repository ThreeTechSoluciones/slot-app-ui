import PlusIcon from '../../assets/plus-icon.svg';
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
import * as s from './header.styles';
import { useLocation, useNavigate } from 'react-router';
import { ConfirmDialog } from '../confirm_dialog/ConfirmDialog';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../app/slices/AuthSlice';
import toast from 'react-hot-toast';

function Header() {
  const dispatch = useDispatch();

  const headerOptions = {
    [Calendario]: 'Calendario',
    [MisAlumnos]: 'Mis alumnos',
    [MisPlanes]: 'Mis planes',
    [MisTurnos]: 'Mis turnos',
  };

  const handleLogout = () => {
    setShowConfirm(false);
    dispatch(clearUser());
    toast.success('Cerraste sesión');
  };

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <s.MainContainer>
      <s.LeftOptionsContainer>
        <s.Logo>
          <img src={LogoCeci} alt="Logo" />
        </s.Logo>
        {Object.entries(headerOptions).map(([route, label]) => (
          <s.Option
            key={route}
            $isActive={pathname === route}
            onClick={() => navigate(route)}
          >
            {label}
          </s.Option>
        ))}
        <s.Button $isActive={pathname === NuevoAlumno} onClick={() => navigate(NuevoAlumno)}>
          Nuevo alumno
          <img src={PlusIcon} height="11" width="11" />
        </s.Button>
      </s.LeftOptionsContainer>
      <s.RightOptionsContainer>
        <s.Logout onClick={() => setShowConfirm(true)}>
          <img src={LogoutIcon} />
          <s.LogoutText>
            Cerrar
            <br />
            sesión
          </s.LogoutText>
        </s.Logout>
        <s.Photo>
          <img src={PerfilPicture} alt="Foto de perfil" />
        </s.Photo>
      </s.RightOptionsContainer>
      {showConfirm && (
        <ConfirmDialog
          message="¿Estás seguro de que quieres cerrar sesión?"
          onConfirm={handleLogout}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </s.MainContainer>
  );
}
export default Header;

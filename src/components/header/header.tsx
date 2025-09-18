import { persistor } from "../../app/store/store";
import useAuthentication from "../../hooks/useAuthentication";
import "./header.css";
import PlusIcon from "../../assets/plus-icon.webp";
import Logo from "../../assets/logo.png";
function Header() {
  const { isAuthenticated } = useAuthentication();

  const handleLogout = () => {
    persistor.purge();
  };

  return (
    <header className="header">
      {isAuthenticated && (
        <>
          <div className="header-left">
            <a href="/home">Listado de alumnos</a>
            <a href="/cuotas">Cuotas mensuales</a>
          </div>
          <div className="header-right">
            <a href="/datos-personales" className="new-student">
              Nuevo alumno
              <img src={PlusIcon} alt="Plus" className="plus-icon" />
            </a>
            <a href="/login" onClick={handleLogout}>
              Salir
            </a>
            <img src={Logo} alt="Logo" className="logo"></img>
          </div>
        </>
      )}
    </header>
  );
}

export default Header;

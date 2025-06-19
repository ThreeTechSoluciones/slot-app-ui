import { persistor } from '../../app/store/store';
import useAuthentication from '../../hooks/useAuthentication';
import './header.css'

function Header() {

  const { isAuthenticated } = useAuthentication()

  const handleLogout = () => {
    persistor.purge(); 
  }

  return (
    <header className='header'>
      { isAuthenticated && (
        <>
        <div>
          <a href='/home'>Listado de alumnos</a>
          <a href='/cuotas'>Cuotas mensuales</a>
        </div>
        <div>
          <a href='/nuevo-alumno'>Nuevo alumno</a>
          <a href='/login' onClick={handleLogout}>Salir</a>
        </div>
        </>
      )}
    </header>
  )
}

export default Header;
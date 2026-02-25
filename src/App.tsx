import { Navigate, Route, Routes } from 'react-router';
import Login from './pages/login/Login';
import Plans from './pages/plans/Plans';
import { PrivateRoute } from './routes/PrivateRoutes';
import StudentDetail from './pages/student_detail/StudentDetail';
import {
  MisAlumnos,
  NuevoAlumno,
  IniciarSesion,
  MisPlanes,
  DetalleAlumno,
  MisTurnos,
  ListadoCuotas,
  getEditarEstudianteStep,
  Calendario,
} from './routes/RoutesUtils';
import CreateStudent from './pages/students/create-student/CreateStudent';
import StudentFeesList from './pages/student_fees_list/FeesList';
import SlotConfiguration from './pages/slots/SlotConfiguration';
import StudentList from './pages/student_list/StudentList';
import EditStudent from './pages/students/edit-student/EditStudent';
import CalendarView from './pages/calendar/CalendarViewPage';
import { MainContent } from './App.styles';
import NotFoundPage from './pages/not_found_page/NotFoundPage';

function App() {
  return (
    <MainContent>
      <Routes>
        <Route path={IniciarSesion} element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path={MisAlumnos} element={<StudentList />} />
          <Route path={MisPlanes} element={<Plans />} />
          <Route path={NuevoAlumno} element={<CreateStudent />} />
          <Route path={DetalleAlumno} element={<StudentDetail />} />
          <Route path={ListadoCuotas} element={<StudentFeesList />} />
          <Route path={MisTurnos} element={<SlotConfiguration />} />
          <Route path={Calendario} element={<CalendarView />} />
          <Route path={getEditarEstudianteStep(':numberOfStep')} element={<EditStudent />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/" element={<Navigate to={IniciarSesion} />} />
      </Routes>
    </MainContent>
  );
}

export default App;

import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import Login from "./pages/login/Login";
import Plans from "./pages/plans/Plans";
import EditStudent from "./pages/students/edit-student/EditStudent";
import { PrivateRoute } from "./routes/PrivateRoutes";
import StudentDetail from "./pages/student_detail/StudentDetail";
import {
  MisAlumnos,
  NuevoAlumno,
  IniciarSesion,
  MisPlanes,
  DetalleAlumno,
  MisTurnos,
  EditarAlumno,
} from "./routes/RoutesUtils";
import CreateStudent from "./pages/students/create-student/CreateStudent";
import SlotConfiguration from "./pages/slots/SlotConfiguration";
import StudentList from "./pages/student_list/StudentList";

function App() {
  return (
    <>
      <Routes>
        <Route path={IniciarSesion} element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path={MisAlumnos} element={<StudentList />} />
          <Route path={MisPlanes} element={<Plans />} />
          <Route path={NuevoAlumno} element={<CreateStudent />} />
          <Route path={DetalleAlumno} element={<StudentDetail />} />
          <Route path={MisTurnos} element={<SlotConfiguration />} />
          <Route path={EditarAlumno} element={<EditStudent />} />
        </Route>
        <Route path="/" element={<Navigate to={IniciarSesion} />} />
      </Routes>
    </>
  );
}

export default App;

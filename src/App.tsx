import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Plans from "./pages/plans/Plans";
import Students from "./pages/students/Students";
import { PrivateRoute } from "./routes/PrivateRoutes";
import StudentDetail from "./pages/student_detail/StudentDetail";
import EditStudent from "./pages/edit_student/EditStudent";
import { MisAlumnos, NuevoAlumno, IniciarSesion, MisPlanes, DetalleAlumno, EditarAlumno } from "./routes/RoutesUtils";


function App() {
  return (
    <>
      <Routes>
        <Route path={IniciarSesion} element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path={MisAlumnos} element={<Home />} />
          <Route path={MisPlanes} element={<Plans />} />
          <Route path={NuevoAlumno} element={<Students />} />
          <Route path={DetalleAlumno} element={<StudentDetail />} />
          <Route path={EditarAlumno} element={<EditStudent />} />
        </Route>
        <Route path="/" element={<Navigate to={IniciarSesion} />} />
      </Routes>
    </>
  );
}

export default App;

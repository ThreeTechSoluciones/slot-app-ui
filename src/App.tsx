import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Plans from "./pages/plans/Plans";
import { PrivateRoute } from "./routes/PrivateRoutes";
import StudentDetail from "./pages/student_detail/StudentDetail";
import { MisAlumnos, NuevoAlumno, IniciarSesion, MisPlanes, DetalleAlumno, MisTurnos } from "./routes/RoutesUtils";
import CreateStudent from "./pages/students/create-student/CreateStudent";
import SlotConfiguration from "./pages/slots/SlotConfiguration";


function App() {
  return (
    <>
      <Routes>
        <Route path={IniciarSesion} element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path={MisAlumnos} element={<Home />} />
          <Route path={MisPlanes} element={<Plans />} />
          <Route path={NuevoAlumno} element={<CreateStudent />} />
          <Route path={DetalleAlumno} element={<StudentDetail />} />
          <Route path={MisTurnos} element={<SlotConfiguration />} />
        </Route>
        <Route path="/" element={<Navigate to={IniciarSesion} />} />
      </Routes>
    </>
  );
}

export default App;

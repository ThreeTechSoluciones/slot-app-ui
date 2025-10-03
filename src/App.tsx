import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import Header from "./components/header/header";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Plans from "./pages/plans/Plans";
import { PrivateRoute } from "./routes/PrivateRoutes";
import StudentDetail from "./pages/student_detail/StudentDetail";
//import EditStudent from "./pages/edit_student/EditStudent";
import CreateStudent from "./pages/students/create-student/CreateStudent";
import StepperCircle from "./components/stepper/StepperCircle";
import StepperHandler from "./components/stepper/StepperHandler";



function App() {
  return (
    <>
      <Header />
      <main className="content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/cuotas" element={<Plans />} />
            <Route path="/nuevo-alumno" element={<CreateStudent />} />
            <Route path="/detalle-alumno" element={<StudentDetail />} />
          </Route>
          <Route path="/" element={<Navigate to="/login" />} />
           <Route path="/stepperCircle" element={<StepperCircle numberOfStep={1} title={"hola"} currentStep={2}/>} />
         <Route path="/stepper" element={<StepperHandler/>} />
        </Routes>
        
      </main>
    </>
  );
}

export default App;

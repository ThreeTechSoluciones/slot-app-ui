import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import Header from "./components/header/header";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Plans from "./pages/plans/Plans";
import StudentData from "./pages/students/forms/StudentData";
import { PrivateRoute } from "./routes/PrivateRoutes";
import StudentDetail from "./pages/student_detail/StudentDetail";
//import EditStudent from "./pages/edit_student/EditStudent";
import PaymentData from "./pages/students/forms/PaymentData";
import PlanData from "./pages/students/forms/PlanData";



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
            <Route path="/datos-del-alumno" element={<StudentData />} />
            <Route path="/detalle-alumno" element={<StudentDetail />} />
            <Route path="/datos-del-pago" element={<PaymentData />} />
            <Route path="/datos-del-plan" element={<PlanData />} />  
          </Route>
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </main>
    </>
  );
}

export default App;

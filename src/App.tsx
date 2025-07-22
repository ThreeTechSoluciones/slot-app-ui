import { Navigate, Route, Routes } from 'react-router';
import './App.css'
import Header from './components/header/header'
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Plans from './pages/plans/Plans';
import Students from './pages/students/Students';
import { PrivateRoute } from './routes/PrivateRoutes';
import StudentDetail from './pages/student_detail/StudentDetail';

function App() {

  return (
    <>
      <Header />
      <main className='content'>
        <Routes>
          <Route path='/login' element={<Login />}/>
          
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path='/cuotas' element={<Plans/>}/>
            <Route path='/nuevo-alumno' element={<Students/>}/>
            <Route path='/detalle-alumno' element={<StudentDetail />} />
          </Route>

          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>      
      </main>
    </>
  )
}

export default App

import { MOCKED_STUDENTS } from "../../mocks/students";
import "./Home.css";
import infoIcon from "../../assets/info-icon.webp";
import trashIcon from "../../assets/trash-icon.webp";
import { useNavigate } from 'react-router';

function Home() {

  const navigate = useNavigate()

  return (
    <table className="table">
      <thead className="thead">
        <tr>
          <th>Filtros</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Estado</th>
          <th>Pago</th>
          <th>Info</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody className="tbody">
        {MOCKED_STUDENTS.map((student) => (
          <tr>
            <td></td>
            <td>{student.name}</td>
            <td>{student.lastname}</td>
            <td
              style={{
                color: student.status === "A término" ? "#00bf63" : "#ff3131",
              }}
            >
              <strong> {student.status}</strong>
            </td>

            <td>
              <div className="actions-container">
                <button
                  className="btn-payment"
                  onClick={() => alert(`Registrar pago de ${student.name}`)}
                >
                  Registrar
                </button>
              </div>
            </td>
            <td>
              <div className="actions-container">
                <img
                  src={infoIcon}
                  alt="Info"
                  className="icon"
                  onClick={() => navigate('/detalle-alumno', { state: { studentId: student.id }})} />
              </div>
            </td>
            <td>
              <div className="actions-container">
                <img
                  src={trashIcon}
                  alt="Eliminar"
                  className="icon"
                  onClick={() => alert(`¿Desea eliminar a ${student.name}?`)}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Home;

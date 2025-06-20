import { MOCKED_STUDENTS } from "../../mocks/students";
import "./Home.css";
import infoIcon from "../../assets/info-icon.webp";
import trashIcon from "../../assets/trash-icon.webp";
function Home() {
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
              <button
                className="btn-payment"
                onClick={() => alert(`Registrar pago de ${student.name}`)}
              >
                Registrar
              </button>
            </td>
            <td>
              <img
                src={infoIcon}
                alt="Info"
                className="icon"
                onClick={() => alert(`Info de ${student.name}`)}
              />
            </td>
            <td>
              <img
                src={trashIcon}
                alt="eliminar"
                className="icon"
                onClick={() => alert(`¿Desea eliminar a ${student.name}?`)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Home;

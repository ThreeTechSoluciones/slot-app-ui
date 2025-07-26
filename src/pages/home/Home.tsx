import "./Home.css";
import infoIcon from "../../assets/info-icon.webp";
import trashIcon from "../../assets/trash-icon.webp";
import activateIcon from "../../assets/activate-icon.svg";
import { useNavigate } from "react-router";
import { useGetUserStudentsQuery } from "../../app/services/UserService";
import useAuthentication from "../../hooks/useAuthentication";
import { useDeleteStudentMutation } from "../../app/services/StudentService";
import toast from "react-hot-toast";

function Home() {
  const { userId } = useAuthentication();
  const { data: students, refetch } = useGetUserStudentsQuery(userId!);
  const [deleteStudent] = useDeleteStudentMutation();
  const navigate = useNavigate();

  const handleDelete = async (studentId: string, studentName: string) => {
    const confirmDelete = window.confirm(`¿Desea eliminar a ${studentName}?`);
    if (!confirmDelete) return;
    deleteStudent(studentId)
      .unwrap()
      .catch((error) => {
        console.error("Error al eliminar estudiante:", error);
        toast.error("Ocurrió un error al eliminar al estudiante.");
      });
  };
  return (
    <div className="students-container">
      <table className="table">
        <thead className="thead">
          <tr>
            <th>Filtros</th>
            <th>DNI</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Estado</th>
            <th>Habilitado</th>
            <th>Pago</th>
            <th>Info</th>
            <th>Eliminar/Dar Alta</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {students &&
            students.map((student) => (
              <tr key={student.id}>
                <td></td>
                <td>{student.dni}</td>
                <td>{student.name}</td>
                <td>{student.lastname}</td>
                <td
                  style={{
                    color:
                      student.status === "En término" ? "#00bf63" : "#ff3131",
                  }}
                >
                  <strong>{student.status}</strong>
                </td>
                <td>
                  <strong
                    style={{ color: student.isActive ? "#00bf63" : "#ff3131" }}
                  >
                    {student.isActive ? "Activo" : "Inactivo"}
                  </strong>
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
                      onClick={() =>
                        navigate("/detalle-alumno", {
                          state: { studentId: student.id },
                        })
                      }
                    />
                  </div>
                </td>
                <td>
                  <div className="actions-container">
                    {!student.isActive ? (
                      <img
                        src={activateIcon}
                        alt="Dar de alta"
                        className="icon"
                        onClick={() =>
                          alert(`¿Desea dar de alta a ${student.name}?`)
                        }
                      />
                    ) : (
                      <img
                        src={trashIcon}
                        alt="Eliminar"
                        className="icon"
                        onClick={() => handleDelete(student.id, student.name)}
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export default Home;

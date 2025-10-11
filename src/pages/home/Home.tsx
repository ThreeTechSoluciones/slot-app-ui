import "./Home.css";
import infoIcon from "../../assets/info-icon.webp";
import trashIcon from "../../assets/trash-icon.webp";
import activateIcon from "../../assets/activate-icon.svg";
import editIcon from "../../assets/edit-icon.png";
import { useNavigate } from "react-router";
import useAuthentication from "../../hooks/useAuthentication";
import { useDeleteStudentMutation } from "../../app/services/StudentService";
import { ConfirmDialog } from "../../components/confirm_dialog/ConfirmDialog";
import { useState } from "react";
import { useGetUserStudentsQuery } from "../../app/services/UserService";
import Filter from "../../components/filter/FilterSearch";
import { skipToken } from "@reduxjs/toolkit/query";

function Home() {
  const { userId } = useAuthentication();
  const [deleteStudent] = useDeleteStudentMutation();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const {
    data: students,
    error,
    isLoading,
  } = useGetUserStudentsQuery(userId ? { userId, filter } : skipToken);
  console.log("Tabla alumnos", students);
  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar estudiantes</p>;

  const handleDelete = async (studentId: string, studentName: string) => {
    setStudentToDelete({ id: studentId, name: studentName });
    setConfirmDialogOpen(true);
  };
  const handleConfirmDeleteClick = () => {
    if (!studentToDelete) return;
    deleteStudent(studentToDelete.id)
      .unwrap()
      .then(() => {
        setConfirmDialogOpen(false);
        setStudentToDelete(null);
      });
  };
  const handleCancelDeleteClick = () => {
    setConfirmDialogOpen(false);
    setStudentToDelete(null);
  };

  return (
    <div className="students-container">
      <Filter
        value={filter}
        onChange={setFilter}
        placeholder="Buscar por DNI, nombre o apellido"
      />
      <table className="table">
        <thead className="thead">
          <tr>
            <th>DNI</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Estado</th>
            <th>Habilitado</th>
            <th>Pago</th>
            <th>Info</th>
            <th>Eliminar/Dar Alta</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {students?.map((student) => (
            <tr key={student.id}>
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
                      className="activate-icon"
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
              <td>
                <div className="actions-container">
                  <img
                    src={editIcon}
                    alt="Editar"
                    className="edit-icon"
                    onClick={() =>
                      navigate("/editar-alumno", {
                        state: { studentId: student.id },
                      })
                    }
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {confirmDialogOpen && studentToDelete && (
        <ConfirmDialog
          message={`¿Desea eliminar a ${studentToDelete.name}?`}
          onConfirm={handleConfirmDeleteClick}
          onCancel={handleCancelDeleteClick}
        />
      )}
    </div>
  );
}
export default Home;

import "./Home.css";
import { useNavigate } from "react-router";
import { useGetUserStudentsQuery } from "../../app/services/UserService";
import useAuthentication from "../../hooks/useAuthentication";
import { useDeleteStudentMutation } from "../../app/services/StudentService";
import { ConfirmDialog } from "../../components/confirm_dialog/ConfirmDialog";
import { useState } from "react";
import Table from "../../components/table/Table";
import type { StudentResponse } from "../../app/types/responses/StudentResponse.type";
import type { Column } from "../../app/types/table";
import dotsIcon from "../../assets/dots-icon.png";

function Home() {
  const { userId } = useAuthentication();
  const { data: students } = useGetUserStudentsQuery(userId!);
  const [deleteStudent] = useDeleteStudentMutation();
  const navigate = useNavigate();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

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

  const columns: Column<StudentResponse>[] = [
    { header: "DNI", accessor: "dni" },
    { header: "Nombre", accessor: "name" },
    { header: "Apellido", accessor: "lastname" },
    {
      header: "Situación",
      render: (student: StudentResponse) => (
        <strong
          style={{
            color: student.status === "En término" ? "#00bf63" : "#ff3131",
          }}
        >
          {student.status}
        </strong>
      ),
    },
    {
      header: "Estado",
      render: (student: StudentResponse) => (
        <strong style={{ color: student.isActive ? "#00bf63" : "#ff3131" }}>
          {student.isActive ? "Activo" : "Inactivo"}
        </strong>
      ),
    },
    {
      header: "Acciones",
      render: (student: StudentResponse) => (
        <div className="actions-container">
          <button>
            <img src={dotsIcon} alt="Dots" className="dots-icon" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="students-container">
      <Table columns={columns} data={students ?? []} />;
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

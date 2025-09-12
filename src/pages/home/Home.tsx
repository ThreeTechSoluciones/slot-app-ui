import { StudentsContainer } from "./Home.styles";
import { useNavigate } from "react-router";
import useAuthentication from "../../hooks/useAuthentication";
import {
  useActivateStudentMutation,
  useDeleteStudentMutation,
} from "../../app/services/StudentService";
import { ConfirmDialog } from "../../components/confirm_dialog/ConfirmDialog";
import { useState } from "react";
import Filter from "../../components/filter/FilterSearch";
import Table from "../../components/table/Table";
import type { StudentResponse } from "../../app/types/responses/StudentResponse.type";
import type { Column } from "../../app/types/table";
import dotsIcon from "../../assets/dots-icon.png";
import { useGetUserStudentsQuery } from "../../app/services/UserService";
import { DropdownMenu } from "../../components/dropdownMenu/DropdownMenu";

function Home() {
  const { userId } = useAuthentication();
  const { data: students } = useGetUserStudentsQuery({ userId: userId! });
  const [deleteStudent] = useDeleteStudentMutation();
  const [activateStudent] = useActivateStudentMutation();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");

  const [studentAction, setStudentAction] = useState<{
    id: string;
    name: string;
    type: "Dar de alta" | "Dar de baja";
  } | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const actionHandlers: Record<
    "Dar de alta" | "Dar de baja",
    (studentId: string) => void
  > = {
    "Dar de baja": (studentId) => {
      deleteStudent(studentId).unwrap();
    },
    "Dar de alta": (studentId) => {
      activateStudent(studentId).unwrap();
    },
  };
  const handleActionClick = (
    studentId: string,
    studentName: string,
    type: "Dar de alta" | "Dar de baja"
  ) => {
    setStudentAction({ id: studentId, name: studentName, type });
    setConfirmDialogOpen(true);
  };
  const handleConfirmClick = () => {
    if (!studentAction) return;
    actionHandlers[studentAction.type](studentAction.id);
    setConfirmDialogOpen(false);
    setStudentAction(null);
  };
  const handleCancelClick = () => {
    setConfirmDialogOpen(false);
    setStudentAction(null);
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
        <DropdownMenu
          icon={dotsIcon}
          options={[
            {
              label: "Ver cuotas",
              onClick: () => navigate(`/cuotas`),
            },
            {
              label: "Ver alumno",
              onClick: () => navigate(`/detalle-alumno/${student.id}`),
            },
            {
              label: "Editar alumno",
              onClick: () => navigate(`/editar-alumno/${student.id}`),
            },
            {
              label: student.isActive ? "Dar de baja" : "Dar de alta",
              onClick: () =>
                handleActionClick(
                  student.id,
                  student.name,
                  student.isActive ? "Dar de baja" : "Dar de alta"
                ),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <StudentsContainer>
      <Filter
        value={filter}
        onChange={setFilter}
        placeholder="Buscar por DNI, nombre o apellido"
      />
      <Table columns={columns} data={students ?? []} />;
      {confirmDialogOpen && studentAction && (
        <ConfirmDialog
          message={`¿Desea ${studentAction.type} a ${studentAction.name}?`}
          onConfirm={handleConfirmClick}
          onCancel={handleCancelClick}
        />
      )}
      |
    </StudentsContainer>
  );
}
export default Home;

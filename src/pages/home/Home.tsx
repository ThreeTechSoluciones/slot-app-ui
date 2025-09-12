import { SituationText, StatusText, StudentsContainer } from "./Home.styles";
import { useNavigate } from "react-router";
import useAuthentication from "../../hooks/useAuthentication";
import {
  useActivateStudentMutation,
  useDeleteStudentMutation,
} from "../../app/services/StudentService";
import { ConfirmDialog } from "../../components/confirm_dialog/ConfirmDialog";
import { useEffect, useState } from "react";
import Filter from "../../components/filter/FilterSearch";
import Table from "../../components/table/Table";
import type { StudentResponse } from "../../app/types/responses/StudentResponse.type";
import type { Column } from "../../app/types/table";
import dotsIcon from "../../assets/dots-icon.png";
import { useGetUserStudentsQuery } from "../../app/services/UserService";
import { DropdownMenu } from "../../components/dropdownMenu/DropdownMenu";
import { SortableButton } from "../../components/sort_button/SortButton";
import { skipToken } from "@reduxjs/toolkit/query/react";

function Home() {
  const { userId } = useAuthentication();
  const [deleteStudent] = useDeleteStudentMutation();
  const [activateStudent] = useActivateStudentMutation();
  const navigate = useNavigate();
  const [studentList, setStudentList] = useState<StudentResponse[]>([]);
  const [filter, setFilter] = useState<string>("");
  const { data: students } = useGetUserStudentsQuery(
    userId ? { userId, filter } : skipToken
  );
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
  useEffect(() => {
    if (students) {
      setStudentList(students);
    }
  }, [students]);

  const sortByField = (field: keyof StudentResponse, asc: boolean) => {
    const sorted = [...studentList].sort((a, b) => {
      const valueA = a[field];
      const valueB = b[field];

      if (field === "dni") {
        return asc
          ? Number(valueA) - Number(valueB)
          : Number(valueB) - Number(valueA);
      }
      return asc
        ? String(valueA).localeCompare(String(valueB))
        : String(valueB).localeCompare(String(valueA));
    });

    setStudentList(sorted);
  };
  const columns: Column<StudentResponse>[] = [
    {
      header: (
        <SortableButton text="DNI" onSort={(asc) => sortByField("dni", asc)} />
      ),
      accessor: "dni",
    },

    {
      header: (
        <SortableButton
          text="Nombre"
          onSort={(asc) => sortByField("name", asc)}
        />
      ),
      accessor: "name",
    },
    {
      header: (
        <SortableButton
          text="Apellido"
          onSort={(asc) => sortByField("lastname", asc)}
        />
      ),
      accessor: "lastname",
    },
    {
      header: "Situación",
      render: (student: StudentResponse) => (
        <SituationText status={student.status ? "Al día" : "Debe"}>
          {student.status ? "Al día" : "Debe"}
        </SituationText>
      ),
    },
    {
      header: "Estado",
      render: (student: StudentResponse) => (
        <StatusText $isActive={student.isActive}>
          {student.isActive ? "Activo" : "Inactivo"}
        </StatusText>
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
      <Table columns={columns} data={studentList} />;
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

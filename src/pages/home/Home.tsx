import {
  SituationText,
  StatusText,
  StudentsContainer,
  FiltersContainer,
  ButtonContainer,
} from "./Home.styles";
import { useNavigate } from "react-router";
import useAuthentication from "../../hooks/useAuthentication";
import { useEffect, useMemo, useState } from "react";
import Table from "../../components/table/Table";
import type { StudentResponse } from "../../app/types/responses/StudentResponse.type";
import type { Column } from "../../app/types/table";
import dotsIcon from "../../assets/dots-icon.png";
import { useGetUserStudentsQuery } from "../../app/services/UserService";
import { DropdownMenu } from "../../components/dropdownMenu/DropdownMenu";
import { SortableButton } from "../../components/sort_button/SortButton";
import { skipToken } from "@reduxjs/toolkit/query/react";
import FilterSearch from "../../components/filter_search/FilterSearch";
import Filter from "../../components/filter/Filter";
import Button from "../../components/button/Button";
import AddIcon from "../../assets/add-icon.svg";

function Home() {
  const { userId } = useAuthentication();
  const navigate = useNavigate();
  const [studentList, setStudentList] = useState<StudentResponse[]>([]);
  const [filter, setFilter] = useState<string>("");
  const { data: students } = useGetUserStudentsQuery(
    userId ? { userId, filter } : skipToken
  );
  useEffect(() => {
    if (students) {
      setStudentList(students);
    }
  }, [students]);
  const sortedStudents = useMemo(() => {
    return [...studentList].sort((a, b) => {
      if (a.isActive !== b.isActive) return a.isActive ? -1 : 1;
      return 0;
    });
  }, [studentList]);
  console.log("Student List:", studentList);
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
        <SituationText status={student.status}>{student.status}</SituationText>
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
          icon={<img src={dotsIcon} alt="Opciones" width={30} height={30} />}
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
              label: "Modificar turnos",
              onClick: () => navigate(`/editar-alumno/${student.id}`), // cambiar ruta cuando esté la pantalla de modifcar turnos
            },
          ]}
        />
      ),
    },
  ];

  return (
    <StudentsContainer>
      <FiltersContainer>
        <FilterSearch
          value={filter}
          onChange={setFilter}
          placeholder="Buscar por DNI, nombre o apellido"
        />
        <Filter
          placeholder="Filtrar por situación"
          options={[
            { label: "Todos", value: "todos" },
            { label: "Debe", value: "debe" },
            { label: "Al día", value: "aldia" },
          ]}
          onSelect={(value) => console.log("Filtro seleccionado:", value)}
        />
        <Filter
          placeholder="Filtrar por estado"
          options={[
            { label: "Activo", value: "activo" },
            { label: "Inactivo", value: "inactivo" },
          ]}
          onSelect={(value) => console.log("Filtro seleccionado:", value)}
        />
        <ButtonContainer>
          <Button variant="primary" size="small">
            Limpiar filtros
          </Button>
          <Button
            variant="primary"
            size="medium"
            icon={<img src={AddIcon} alt="Add Icon" />}
            onClick={() => navigate("/nuevo-alumno")}
          >
            Nuevo alumno
          </Button>
        </ButtonContainer>
      </FiltersContainer>
      <Table columns={columns} data={sortedStudents} />;
    </StudentsContainer>
  );
}
export default Home;

import {
  SituationText,
  StatusText,
  StudentsContainer,
  Title,
  LeftContainer,
  RightContainer,
  FiltersContainer,
} from "./StudentList.styles";
import { useLocation, useNavigate } from "react-router";
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

function StudentList() {
  const { userId } = useAuthentication();
  const navigate = useNavigate();
  const location = useLocation();
  const { studentId } = location.state || {};
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [situationFilter, setSituationFilter] = useState<string>("");
  const [studentList, setStudentList] = useState<StudentResponse[]>([]);
  const [filter, setFilter] = useState<string>("");
  const { data: studentsPage } = useGetUserStudentsQuery(
    userId ? { userId, filter } : skipToken
  );

  useEffect(() => {
    if (studentsPage) {
      setStudentList(studentsPage.content);
    }
  }, [studentsPage]);

  const statusMap: Record<string, string> = {
    condeuda: "Con deuda",
    entermino: "En término",
  };

  const sortedStudents = useMemo(() => {
    let list = [...studentList];
    if (situationFilter) {
      list = list.filter(
        (student) =>
          student.status.toLowerCase() ===
          statusMap[situationFilter]?.toLowerCase()
      );
    }
    if (statusFilter) {
      const isActive = statusFilter === "activo";
      list = list.filter((student) => student.isActive === isActive);
    }

    list.sort((a, b) => {
      if (a.isActive !== b.isActive) return a.isActive ? -1 : 1;
      //si a es true (activo) y b false (inactivo), a (activo) va primero (-1)
      //si a es false (inactivo) y b true (activo), b (activo) va primero (1)
      return 0; //si son iguales
    });
    return list;
  }, [studentList, statusFilter, situationFilter]);

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
      Cell: ({ original }) => <span>{original.name}</span>,
    },
    {
      header: (
        <SortableButton
          text="Apellido"
          onSort={(asc) => sortByField("lastname", asc)}
        />
      ),
      accessor: "lastname",
      Cell: ({ original }) => <span>{original.lastname}</span>,
    },
    {
      header: "Situación",
      Cell: ({ original }) => (
        <SituationText $status={original.status}>
          {original.status}
        </SituationText>
      ),
    },
    {
      header: "Estado",
      Cell: ({ original }) => (
        <StatusText $isActive={original.isActive}>
          {original.isActive ? "Activo" : "Inactivo"}
        </StatusText>
      ),
    },
    {
      header: "Acciones",
      Cell: ({ original }) => (
        <DropdownMenu
          icon={<img src={dotsIcon} alt="Opciones" width={30} height={30} />}
          size="small"
          options={[
            {
              label: "Ver cuotas",
              onClick: () =>
                navigate(`/cuotas`, { state: { studentId: original.id } }),
            },
            {
              label: "Ver alumno",
              onClick: () =>
                navigate(`/detalle-alumno`, {
                  state: { studentId: original.id },
                }),
            },
            {
              label: "Modificar turnos",
              onClick: () =>
                navigate(`/editar-alumno`, {
                  state: { studentId: original.id },
                }), // cambiar ruta cuando esté la pantalla de modifcar turnos
            },
          ]}
        />
      ),
    },
  ];

  return (
    <StudentsContainer>
      <Title>LISTADO DE ALUMNOS</Title>
      <FiltersContainer>
        <LeftContainer>
          <FilterSearch
            value={filter}
            onChange={setFilter}
            placeholder="Buscar por DNI, nombre o apellido"
          />
          <Filter
            placeholder="Filtrar por situación"
            options={[
              { label: "Con deuda", value: "condeuda" },
              { label: "En término", value: "entermino" },
            ]}
            value={situationFilter}
            onSelect={setSituationFilter}
          />
          <Filter
            placeholder="Filtrar por estado"
            options={[
              { label: "Activo", value: "activo" },
              { label: "Inactivo", value: "inactivo" },
            ]}
            value={statusFilter}
            onSelect={setStatusFilter}
          />

          <Button
            size="small"
            variant="primary"
            fontsize="small"
            onClick={() => {
              setSituationFilter("");
              setStatusFilter("");
            }}
          >
            Limpiar filtros
          </Button>
        </LeftContainer>
        <RightContainer>
          <Button
            variant="primary"
            size="medium"
            icon={<img src={AddIcon} alt="Add Icon" />}
            onClick={() => navigate("/nuevo-alumno")}
          >
            Nuevo alumno
          </Button>
        </RightContainer>
      </FiltersContainer>
      <Table columns={columns} data={sortedStudents} />;
    </StudentsContainer>
  );
}
export default StudentList;

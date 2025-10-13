import {
  SituationText,
  StatusText,
  StudentsContainer,
  LeftContainer,
  RightContainer,
  FiltersContainer,
} from "./Home.styles";
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

function Home() {
  const { userId } = useAuthentication();
  const navigate = useNavigate();
  const location = useLocation();
  const { studentId } = location.state || {};
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [situationFilter, setSituationFilter] = useState<string>("");
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
        <SituationText $status={student.status}>{student.status}</SituationText>
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
          size="small"
          options={[
            {
              label: "Ver cuotas",
              onClick: () =>
                navigate(`/cuotas`, { state: { studentId: student.id } }),
            },
            {
              label: "Ver alumno",
              onClick: () =>
                navigate(`/detalle-alumno`, {
                  state: { studentId: student.id },
                }),
            },
            {
              label: "Modificar turnos",
              onClick: () =>
                navigate(`/editar-alumno`, {
                  state: { studentId: student.id },
                }), // cambiar ruta cuando esté la pantalla de modifcar turnos
            },
          ]}
        />
      ),
    },
  ];

  return (
    <StudentsContainer>
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
            onSelect={(value) => setSituationFilter(value)}
          />
          <Filter
            placeholder="Filtrar por estado"
            options={[
              { label: "Activo", value: "activo" },
              { label: "Inactivo", value: "inactivo" },
            ]}
            onSelect={(value) => setStatusFilter(value)}
          />

          <Button
            variant="primary"
            size="small"
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
export default Home;

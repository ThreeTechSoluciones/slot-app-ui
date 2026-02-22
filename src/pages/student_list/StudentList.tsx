import * as s from './StudentList.styles';
import { useNavigate } from 'react-router';
import useAuthentication from '../../hooks/useAuthentication';
import { useEffect, useState } from 'react';
import Table from '../../components/table/Table';
import type { StudentResponse } from '../../app/types/responses/StudentResponse.type';
import type { Column } from '../../app/types/table';
import dotsIcon from '../../assets/dots-icon.png';
import { useGetUserStudentsQuery } from '../../app/services/UserService';
import { DropdownMenu } from '../../components/dropdownMenu/DropdownMenu';
import { SortableButton } from '../../components/sort_button/SortButton';
import { skipToken } from '@reduxjs/toolkit/query/react';
import FilterSearch from '../../components/filter_search/FilterSearch';
import Filter from '../../components/filter/Filter';
import Button from '../../components/button/Button';
import AddIcon from '../../assets/add-icon.svg';
import type { SortConfig } from '../../app/types/sort';
import {
  DetalleAlumno,
  ListadoCuotas,
  NuevoAlumno,
  ModificarTurnos,
} from '../../routes/RoutesUtils';
import StudentMetrics from './StudentsMetrics';
import { Pagination } from '../../components/pagination/Pagination';

function StudentList() {
  const { userId } = useAuthentication();
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [situationFilter, setSituationFilter] = useState<string>('');
  const [filter, setFilter] = useState<string>('');
  const [sort, setSort] = useState<SortConfig[]>([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const {
    data: studentsPage,
    isLoading,
    isError,
  } = useGetUserStudentsQuery(
    userId
      ? {
          userId,
          filter,
          page: page - 1,
          size,
          status: situationFilter || undefined,
          isActive: statusFilter === '' ? undefined : statusFilter === 'activo',
          sort: sort.length > 0 ? sort : undefined,
        }
      : skipToken,
    { refetchOnMountOrArgChange: true },
  );
  useEffect(() => {
    setPage(1);
  }, [filter, situationFilter, statusFilter]);
  if (isLoading) return <div>Cargando...</div>;
  if (isError) return <div>Ocurrió un error a la hora de cargar a los estudiantes.</div>;
  if (!studentsPage) return <div>No hay información disponible.</div>;
  const columns: Column<StudentResponse>[] = [
    {
      header: (
        <SortableButton
          text="DNI"
          onSort={(isAsc) => setSort([{ property: 'dni', direction: isAsc ? 'ASC' : 'DESC' }])}
        />
      ),
      accessor: 'dni',
    },

    {
      header: (
        <SortableButton
          text="Nombre"
          onSort={(isAsc) => setSort([{ property: 'name', direction: isAsc ? 'ASC' : 'DESC' }])}
        />
      ),
      accessor: 'name',
      render: (student) => <span>{student.name}</span>,
    },
    {
      header: (
        <SortableButton
          text="Apellido"
          onSort={(isAsc) => setSort([{ property: 'lastname', direction: isAsc ? 'ASC' : 'DESC' }])}
        />
      ),
      accessor: 'lastname',
      render: (student) => <span>{student.lastname}</span>,
    },
    {
      header: 'Situación',
      render: (student) => (
        <s.SituationText $status={student.status}>{student.status}</s.SituationText>
      ),
    },
    {
      header: 'Estado',
      render: (student) => (
        <s.StatusText $isActive={student.isActive}>
          {student.isActive ? 'Activo' : 'Inactivo'}
        </s.StatusText>
      ),
    },
    {
      header: 'Acciones',
      render: (student) => (
        <DropdownMenu
          icon={<img src={dotsIcon} alt="Opciones" width={30} height={30} />}
          size="small"
          options={[
            {
              label: 'Ver cuotas',
              onClick: () =>
                navigate(ListadoCuotas, {
                  state: { studentId: student.id },
                }),
            },
            {
              label: 'Ver alumno',
              onClick: () =>
                navigate(DetalleAlumno, {
                  state: { studentId: student.id },
                }),
            },
            {
              label: 'Modificar turnos',
              onClick: () =>
                navigate(ModificarTurnos, {
                  state: { studentId: student.id },
                }),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <s.StudentsContainer>
      <s.ContentContainer>
        <s.Title>LISTADO DE ALUMNOS</s.Title>
        <s.MetricsContainer>
          <StudentMetrics />
        </s.MetricsContainer>

        <s.FiltersContainer>
          <s.LeftContainer>
            <s.FilterSearchContainer>
              <FilterSearch
                value={filter}
                onChange={setFilter}
                placeholder="Buscar por DNI, nombre o apellido"
              />
            </s.FilterSearchContainer>
            <Filter
              placeholder="Filtrar por situación"
              options={[
                { label: 'Con deuda', value: 'CON_DEUDA' },
                { label: 'En término', value: 'EN_TERMINO' },
              ]}
              value={situationFilter}
              onSelect={setSituationFilter}
            />
            <Filter
              placeholder="Filtrar por estado"
              options={[
                { label: 'Activo', value: 'activo' },
                { label: 'Inactivo', value: 'inactivo' },
              ]}
              value={statusFilter}
              onSelect={setStatusFilter}
            />
            <Button
              size="small"
              variant="primary"
              fontsize="small"
              onClick={() => {
                setFilter('');
                setSituationFilter('');
                setStatusFilter('');
              }}
            >
              Limpiar filtros
            </Button>
          </s.LeftContainer>
          <s.RightContainer>
            <Button
              variant="primary"
              size="medium"
              icon={<img src={AddIcon} alt="Add Icon" />}
              onClick={() => navigate(NuevoAlumno)}
            >
              Nuevo alumno
            </Button>
          </s.RightContainer>
        </s.FiltersContainer>
        <Table columns={columns} data={studentsPage.content} />
      </s.ContentContainer>

      <s.PaginationContainer>
        <Pagination
          page={page}
          size={size}
          totalElements={studentsPage.totalElements}
          totalPages={studentsPage.totalPages}
          onPageChange={setPage}
          onSizeChange={(newSize) => {
            setPage(1);
            setSize(newSize);
          }}
        />
      </s.PaginationContainer>
    </s.StudentsContainer>
  );
}
export default StudentList;

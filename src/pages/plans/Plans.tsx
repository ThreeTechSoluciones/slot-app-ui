import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query";
import useAuthentication from "../../hooks/useAuthentication";
import { useGetAllPlansQuery } from "../../app/services/PlanService";
import { formatCurrency } from "../../utils/Formatter";
import type { Column } from "../../app/types/table";
import type { PlanResponse } from "../../app/types/responses/PlanResponse.type";
import Table from "../../components/table/Table";
import { SortableButton } from "../../components/sort_button/SortButton";
import { DropdownMenu } from "../../components/dropdownMenu/DropdownMenu";
import FilterSearch from "../../components/filter_search/FilterSearch";
import Button from "../../components/button/Button";
import DotsIcon from "../../assets/dots-icon.png";
import AddIcon from "../../assets/add-icon.svg";
import {
  PlansContainer,
  FiltersContainer,
  LeftContainer,
  RightContainer,
  Title,
} from "./Plans.styles";

function Plans() {
  // const { userId } = useAuthentication();
  const navigate = useNavigate();

  const [filter, setFilter] = useState<string>("");
  const [planList, setPlanList] = useState<PlanResponse[]>([]);

  const { data: plans, isLoading, isError } = useGetAllPlansQuery();

  // Actualiza la lista cuando lleguen los datos
  useMemo(() => {
    if (plans) {
      setPlanList(plans);
    }
  }, [plans]);

  // Filtra los planes según el buscador
  const filteredPlans = useMemo(() => {
    if (!filter) return planList;

    return planList.filter((plan) =>
      plan.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [planList, filter]);

  // Limpiar filtros
  const handleClearFilters = () => {
    setFilter("");
  };

  // Columnas de la tabla
  const columns: Column<PlanResponse>[] = [
    {
      header: <SortableButton text="Nombre del plan" />,
      accessor: "name",
    },
    {
      header: <SortableButton text="Cantidad de días asignados" />,
      accessor: "numberOfDays",
      Cell: ({ original }) => <span>{original.numberOfDays}</span>,
    },
    {
      header: <SortableButton text="Precio actual" />,
      accessor: "price",
      Cell: ({ original }) => <span>{formatCurrency(original.price)}</span>,
    },
    {
      header: "Acciones",
      Cell: ({ original }) => (
        <DropdownMenu
          icon={<img src={DotsIcon} alt="Opciones" width={30} height={30} />}
          size="small"
          options={[
            {
              label: "Editar plan",
              onClick: () =>
                navigate(`/editar-plan`, { state: { planId: original.id } }),
            },
            // {
            //   label: "Eliminar",
            //   onClick: () => handleDeletePlan(original.id),
            // },
          ]}
        />
      ),
    },
  ];

  return (
    <PlansContainer>
      <Title>GESTIÓN DE PLANES</Title>

      <FiltersContainer>
        <LeftContainer>
          <FilterSearch
            value={filter}
            onChange={setFilter}
            placeholder="Buscar por nombre"
          />

          <Button size="small" variant="primary" onClick={handleClearFilters}>
            Limpiar filtros
          </Button>
        </LeftContainer>

        <RightContainer>
          <Button
            variant="primary"
            size="medium"
            icon={<img src={AddIcon} alt="Agregar" />}
            onClick={() => navigate("/nuevo-plan")}
          >
            Nuevo plan
          </Button>
        </RightContainer>
      </FiltersContainer>

      <Table columns={columns} data={filteredPlans} />
    </PlansContainer>
  );
}

export default Plans;

import { useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
import { ConfirmDialog } from "../../components/confirm_dialog/ConfirmDialog";
import { toast } from "react-hot-toast";
import { GenericModal } from "../../components/generic_modal/GenericModal";
import CreatePlanForm from "./PlanForm/CreatePlanForm";
import { useCreatePlanMutation } from "../../app/services/PlanService";
import { useGetUserPlansQuery } from "../../app/services/UserService";
import { skipToken } from "@reduxjs/toolkit/query/react";
import useAuthentication from "../../hooks/useAuthentication";
import type { CreatePlanRequest } from "../../app/types/requests/PlansRequest/CreatePlansRequest.type";

function Plans() {
  const navigate = useNavigate();
  const formRef = useRef<any>(null);
  const [filter, setFilter] = useState<string>("");
  const [planList, setPlanList] = useState<PlanResponse[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  // const [deletePlan, { isLoading: isDeleting }] = useDeletePlanMutation();
  const [createPlan] = useCreatePlanMutation();
  const { userId } = useAuthentication();
  const {
    data: plans,
    isLoading,
    isError,
  } = useGetUserPlansQuery(userId ? userId : skipToken);
  useMemo(() => {
    if (plans) {
      setPlanList(plans);
    }
  }, [plans]);

  //Filtro de busqueda por nombre desde el frontend, cuando
  //este el backend se tiene que modificar:
  const filteredPlans = useMemo(() => {
    if (!filter) return planList;

    return planList.filter((plan) =>
      plan.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [planList, filter]);

  const handleClearFilters = () => {
    setFilter("");
  };

  //CREAR PLAN
  const handleCreate = async (data: CreatePlanRequest) => {
    try {
      await createPlan(data).unwrap();
      toast.success("Plan creado correctamente");
      setShowCreateModal(false);
    } catch (error: any) {
      toast.error("Error al crear el plan");
    }
  };

  const handleCreateFromModal = async () => {
    if (!formRef.current) return;
    const data = await formRef.current.submit();
    if (!data) return;
  };

  //simulacion para eliminar el plan, cuando el endpoint esté listo saco esto y uso el hook de RTK Query
  const deletePlan = async (id: string) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 500);
    });
  };

  const handleOpenDeleteModal = (planId: string) => {
    setSelectedPlanId(planId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedPlanId) return;

    try {
      await deletePlan(selectedPlanId);

      setShowDeleteModal(false);
      setSelectedPlanId(null);

      toast.success("Plan eliminado correctamente");
    } catch (error) {
      toast.error("Error al eliminar el plan");
    }
  };
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedPlanId(null);
  };

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
            {
              label: "Eliminar",
              onClick: () => handleOpenDeleteModal(original.id),
            },
          ]}
        />
      ),
    },
  ];
  if (isLoading) return <div>Cargando planes...</div>;
  if (isError) return <div>Error al cargar planes</div>;
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
            onClick={() => setShowCreateModal(true)}
          >
            Nuevo plan
          </Button>
        </RightContainer>
      </FiltersContainer>

      <Table columns={columns} data={filteredPlans} />
      {showDeleteModal && (
        <ConfirmDialog
          message="¿Estás seguro de que deseas eliminar este plan?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          // isLoading={isDeleting}
        />
      )}
      {showCreateModal && (
        <GenericModal
          isOpen={showCreateModal}
          title="REGISTRAR NUEVO PLAN"
          confirmText="Registrar"
          onConfirm={handleCreateFromModal}
          onCancel={() => setShowCreateModal(false)}
        >
          <CreatePlanForm ref={formRef} onSubmit={handleCreate} />
        </GenericModal>
      )}
    </PlansContainer>
  );
}

export default Plans;

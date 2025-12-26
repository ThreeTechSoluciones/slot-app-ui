import { useState, useMemo, useRef } from "react";
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
import CreatePlanForm from "./CreatePlanForm/CreatePlanForm";
import {
  useCreatePlanMutation,
  useUpdatePlanPriceMutation,
  useDeletePlanMutation,
} from "../../app/services/PlanService";
import { useGetUserPlansQuery } from "../../app/services/UserService";
import { skipToken } from "@reduxjs/toolkit/query/react";
import useAuthentication from "../../hooks/useAuthentication";
import EditPlan from "./EditPlan/EditPlan";

function Plans() {
  const formRef = useRef<any>(null);
  const [filter, setFilter] = useState<string>("");
  const [planList, setPlanList] = useState<PlanResponse[]>([]);
  const [showModal, setShowModal] = useState<
    "CREATE" | "EDIT" | "DELETE" | null
  >(null);
  const [selectedPlan, setSelectedPlan] = useState<PlanResponse | null>(null);
  const [editPlan] = useUpdatePlanPriceMutation();
  const [deletePlan] = useDeletePlanMutation();
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
  const handleMutation = async (
    action: () => Promise<any>,
    onSuccess: () => void,
    successMessage: string
  ) => {
    try {
      await action();
      toast.success(successMessage);
      onSuccess();
    } finally {
    }
  };
  //CREAR PLAN
  const handleCreatePlan = async () => {
    if (!formRef.current) return;

    const data = await formRef.current.submit();
    if (!data || !userId) return;
    const finalRequest = {
      ...data,
      userId,
    };
    await handleMutation(
      () => createPlan(finalRequest).unwrap(),
      () => setShowModal(null),
      "Plan creado correctamente"
    );
  };
  //EDITAR PLAN
  const handleEditPlan = async () => {
    if (!formRef.current) return;

    const data = await formRef.current.submit();
    if (!data) return;

    await handleMutation(
      () => editPlan(data).unwrap(),
      () => setShowModal(null),
      "Plan editado correctamente"
    );
  };
  //ELIMINAR PLAN
  const handleDeletePlan = async () => {
    if (!selectedPlan || !selectedPlan.id) return;

    await handleMutation(
      () => deletePlan(selectedPlan.id).unwrap(),
      () => {
        setShowModal(null);
        setSelectedPlan(null);
      },
      "Plan eliminado correctamente"
    );
  };
  const MODALS = {
    DELETE: (
      <ConfirmDialog
        message="¿Estás seguro de que deseas eliminar este plan?"
        onConfirm={handleDeletePlan}
        onCancel={() => setShowModal(null)}
      />
    ),
    CREATE: (
      <GenericModal
        title="REGISTRAR NUEVO PLAN"
        confirmText="Registrar"
        onConfirm={handleCreatePlan}
        onCancel={() => setShowModal(null)}
      >
        <CreatePlanForm ref={formRef} />
      </GenericModal>
    ),
    EDIT: selectedPlan && (
      <GenericModal
        title="EDITAR PLAN"
        confirmText="Editar"
        onConfirm={handleEditPlan}
        onCancel={() => {
          setShowModal(null);
          setSelectedPlan(null);
        }}
      >
        <EditPlan
          ref={formRef}
          planId={selectedPlan.id}
          planName={selectedPlan.name}
          numberOfDays={selectedPlan.numberOfDays}
          currentAmount={selectedPlan.price}
        />
      </GenericModal>
    ),
  };
  const columns: Column<PlanResponse>[] = [
    {
      header: <SortableButton text="Nombre del plan" />,
      accessor: "name",
    },
    {
      header: <SortableButton text="Cantidad de días asignados" />,
      accessor: "numberOfDays",
      render: (plan) => <span>{plan.numberOfDays}</span>,
    },
    {
      header: <SortableButton text="Precio actual" />,
      accessor: "price",
      render: (plan) => <span>{formatCurrency(plan.price)}</span>,
    },
    {
      header: "Acciones",
      render: (plan) => (
        <DropdownMenu
          icon={<img src={DotsIcon} alt="Opciones" width={30} height={30} />}
          size="small"
          options={[
            {
              label: "Editar plan",
              onClick: () => {
                setShowModal("EDIT");
                setSelectedPlan(plan);
              },
            },
            {
              label: "Eliminar",
              onClick: () => {
                setShowModal("DELETE");
                setSelectedPlan(plan);
              },
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
            onClick={() => setShowModal("CREATE")}
          >
            Nuevo plan
          </Button>
        </RightContainer>
      </FiltersContainer>

      <Table columns={columns} data={filteredPlans} />
      {showModal && MODALS[showModal]}
    </PlansContainer>
  );
}

export default Plans;

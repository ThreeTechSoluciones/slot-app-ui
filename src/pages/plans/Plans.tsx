import { useState, useRef, useEffect } from 'react';
import { formatCurrency } from '../../utils/Formatter';
import type { Column } from '../../app/types/table';
import type { PlanResponse } from '../../app/types/responses/PlanResponse.type';
import Table from '../../components/table/Table';
import { SortableButton } from '../../components/sort_button/SortButton';
import { DropdownMenu } from '../../components/dropdownMenu/DropdownMenu';
import FilterSearch from '../../components/filter_search/FilterSearch';
import Button from '../../components/button/Button';
import DotsIcon from '../../assets/dots-icon.png';
import AddIcon from '../../assets/add-icon.svg';
import * as s from './Plans.styles';
import { ConfirmDialog } from '../../components/confirm_dialog/ConfirmDialog';
import { toast } from 'react-hot-toast';
import CreatePlanForm from './CreatePlanForm/CreatePlanForm';
import {
  useCreatePlanMutation,
  useUpdatePlanMutation,
  useDeletePlanMutation,
} from '../../app/services/PlanService';
import { useGetUserPlansQuery } from '../../app/services/UserService';
import { skipToken } from '@reduxjs/toolkit/query/react';
import useAuthentication from '../../hooks/useAuthentication';
import EditPlan from './EditPlan/EditPlan';
import { formatDateToDash } from '../../utils/DateFormatter';
import { Pagination } from '../../components/pagination/Pagination';
import type { SortConfig } from '../../app/types/sort';
import Modal, { type ModalProps } from '../../components/unified_modal/Modal';

enum ModalType {
  DELETE = 'DELETE',
  CREATE = 'CREATE',
  EDIT = 'EDIT',
  NONE = 'NONE',
}

function Plans() {
  const formRef = useRef<any>(null);
  const [filter, setFilter] = useState<string>('');
  
  const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
  const [showModal, setShowModal] = useState<boolean>(false);

  const [selectedPlan, setSelectedPlan] = useState<PlanResponse | null>(null);
  const [editPlan] = useUpdatePlanMutation();
  const [deletePlan] = useDeletePlanMutation();
  const [createPlan] = useCreatePlanMutation();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [sort, setSort] = useState<SortConfig[]>([]);
  const { userId } = useAuthentication();
  const {
    data: plansData,
    isLoading,
    isError,
  } = useGetUserPlansQuery(
    userId
      ? {
          userId,
          page: page - 1,
          size,
          planName: filter,
          sort: sort.length > 0 ? sort : undefined,
        }
      : skipToken,
  );

  const handleClearFilters = () => setFilter('');

  const closeModal = () => {
    setModalType(ModalType.NONE);
    setSelectedPlan(null);
    setShowModal(false);
  }
  
  const handleMutation = async (
    action: () => Promise<any>,
    onSuccess: () => void,
    successMessage: string,
  ) => {
    try {
      await action();
      toast.success(successMessage);
      onSuccess();
    } finally {
    }
  };

  const handleCreatePlan = async () => {
    if (!formRef.current) return;

    const data = await formRef.current.submit();
    if (!data || !userId) return;
    const finalRequest = {
      ...data,
      name: data.name.charAt(0).toUpperCase() + data.name.slice(1).toLowerCase(),
      userId,
    };
    await handleMutation(
      () => createPlan(finalRequest).unwrap(),
      () => closeModal(),
      'Plan registrado',
    );
  };

  const handleEditPlan = async () => {
    if (!formRef.current) return;
    const data = await formRef.current.submit();
    if (!data) return;
    const finalRequest = {
      ...data,
      name: data.name.charAt(0).toUpperCase() + data.name.slice(1).toLowerCase(),
      startDate: formatDateToDash(data.startDate),
    };
    await handleMutation(
      () => editPlan(finalRequest).unwrap(),
      () => closeModal(),
      'Plan editado',
    );
  };

  const handleDeletePlan = async () => {
    if (!selectedPlan || !selectedPlan.id) return;

    await handleMutation(
      () => deletePlan(selectedPlan.id).unwrap(),
      () => closeModal(),
      'Plan eliminado',
    );
  };

  const openModal = (type: ModalType) => {
    setModalType(type);
    setShowModal(true);
  }

  const modalConfig: Record<ModalType, ModalProps> = {
    [ModalType.DELETE]: {
      // TODO: Revisar borde lateral izquierdo en amarillo que aparece al usar el ConfirmDialog dentro del Modal
      children: <ConfirmDialog message="¿Estás seguro de que deseas eliminar este plan?" />,
      primaryButtonText: 'Eliminar',
      secondaryButtonText: 'Cancelar',
      onConfirm: handleDeletePlan
    },
    [ModalType.CREATE]: {
      children: <CreatePlanForm ref={formRef} />,
      primaryButtonText: 'Registrar',
      secondaryButtonText: 'Cancelar',
      onConfirm: handleCreatePlan,
      title: 'Registrar nuevo plan',
    },
    [ModalType.EDIT]: {
      children: <EditPlan ref={formRef} planId={selectedPlan?.id!} planName={selectedPlan?.name!} numberOfDays={selectedPlan?.numberOfDays!} currentAmount={selectedPlan?.price!} />,
      primaryButtonText: 'Editar',
      secondaryButtonText: 'Cancelar',
      onConfirm: handleEditPlan,
      title: 'EDITAR PLAN',
    },
    [ModalType.NONE]: {
      children: <></>,
    }
  }

  const columns: Column<PlanResponse>[] = [
    {
      header: (
        <SortableButton
          text="Nombre del plan"
          onSort={(isAsc) => setSort([{ property: 'name', direction: isAsc ? 'ASC' : 'DESC' }])}
        />
      ),
      accessor: 'name',
    },
    {
      header: (
        <SortableButton
          text="Cantidad de días asignados"
          onSort={(isAsc) =>
            setSort([{ property: 'numberOfDays', direction: isAsc ? 'ASC' : 'DESC' }])
          }
        />
      ),
      accessor: 'numberOfDays',
      render: (plan) => <span>{plan.numberOfDays}</span>,
    },
    {
      header: (
        <SortableButton
          text="Precio actual"
          onSort={(isAsc) => setSort([{ property: 'price', direction: isAsc ? 'ASC' : 'DESC' }])}
        />
      ),
      accessor: 'price',
      render: (plan) => <span>{formatCurrency(plan.price)}</span>,
    },
    {
      header: 'Acciones',
      render: (plan) => (
        <DropdownMenu
          icon={<img src={DotsIcon} alt="Opciones" width={30} height={30} />}
          size="small"
          options={[
            {
              label: 'Editar plan',
              onClick: () => {
                openModal(ModalType.EDIT);
                setSelectedPlan(plan);
              },
            },
            {
              label: 'Eliminar',
              onClick: () => {
                openModal(ModalType.DELETE);
                setSelectedPlan(plan);
              },
            },
          ]}
        />
      ),
    },
  ];
  useEffect(() => {
    setPage(1);
  }, [filter]);
  if (isLoading) return <div>Cargando...</div>;
  if (isError) return <div>Ocurrió un error a la hora de cargar a los planes.</div>;
  if (!plansData) return <div>No hay información disponible.</div>;
  return (
    <s.PlansContainer>
      <s.Title>MIS PLANES</s.Title>
      <s.FiltersContainer>
        <s.LeftContainer>
          <s.FilterSearchContainer>
            <FilterSearch value={filter} onChange={setFilter} placeholder="Buscar por nombre" />
          </s.FilterSearchContainer>
          <Button fontsize="medium" variant="primary" onClick={handleClearFilters}>
            Limpiar filtros
          </Button>
        </s.LeftContainer>
        <s.RightContainer>
          <Button
            variant="primary"
            fontsize="medium"
            icon={<img src={AddIcon} alt="Agregar" />}
            onClick={() => openModal(ModalType.CREATE)}
          >
            Nuevo plan
          </Button>
        </s.RightContainer>
      </s.FiltersContainer>
      <Table columns={columns} data={plansData.content} />
      <s.PaginationContainer>
        <Pagination
          page={page}
          size={size}
          totalElements={plansData.totalElements}
          totalPages={plansData.totalPages}
          onPageChange={setPage}
          onSizeChange={(newSize) => {
            setPage(1);
            setSize(newSize);
          }}
        />
      </s.PaginationContainer>
      <Modal 
        active={showModal}
        title={modalConfig[modalType].title}
        primaryButtonText={modalConfig[modalType].primaryButtonText}
        secondaryButtonText={modalConfig[modalType].secondaryButtonText}
        onConfirm={modalConfig[modalType].onConfirm}
        onCancel={() => setShowModal(false)}
      >
        { modalConfig[modalType].children }
      </Modal>
    </s.PlansContainer>
  );
}

export default Plans;

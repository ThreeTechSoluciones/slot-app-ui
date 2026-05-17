import * as s from './SlotConfiguration.styles';
import EditIcon from '../../assets/edit-icon.svg';
import EditSlotForm from './forms/EditSlotForm';
import { useRef, useState } from 'react';
import AddIcon from '../../assets/add-icon.svg';
import { DaysOfWeek } from '../../utils/DaysOfWeek';
import DeleteIcon from '../../assets/delete-icon.svg';
import CalendarIcon from '../../assets/calendar-icon.svg';
import CaretIcon from '../../assets/caret-icon.svg';
import CreateSlotForm from './forms/CreateSlotForm';
import {
  useCreateSlotMutation,
  useDeleteSlotMutation,
  useUpdateSlotMutation,
} from '../../app/services/SlotService';
import useAuthentication from '../../hooks/useAuthentication';
import toast from 'react-hot-toast';
import { ModalType, type ModalConfig } from '../../utils/SlotsModalsUtils';
import {
  useGetSlotsQuery,
  useGetUserPreferencesQuery,
  useUpdateSlotsCapacityMutation,
} from '../../app/services/UserService';
import { ConfirmDialog } from '../../components/confirm_dialog/ConfirmDialog';
import EditCapacityForm from './forms/EditCapacityForm';
import type { SlotResponse } from '../../app/types/responses/SlotResponse.type';
import Modal, { type ModalProps } from '../../components/unified_modal/Modal';

function SlotConfiguration() {
  const [showModal, setShowModal] = useState<boolean>(false);

  const [modalType, setModalType] = useState<ModalType>();

  const [currentSlot, setCurrentSlot] = useState<SlotResponse | null>(null);

  const [showConfirm, setShowConfirm] = useState(false);

  const { userId } = useAuthentication();

  const [createSlot] = useCreateSlotMutation();

  const [updateSlotCapacity] = useUpdateSlotsCapacityMutation();

  const { data: userPreferences, isLoading, isError } = useGetUserPreferencesQuery(userId!);

  const [updateSlot] = useUpdateSlotMutation();

  const [deleteSlot] = useDeleteSlotMutation();

  const [selectEnglishValue, setSelectEnglishValue] = useState<string>('');

  const [selectSpanishValue, setSelectSpanishValue] = useState<string>('');

  const editCapacityRef = useRef<any>(null);

  const createSlotRef = useRef<any>(null);

  const editSlotRef = useRef<any>(null);

  const deleteSlotRef = useRef<any>(null);

  const { data: registeredSlots } = useGetSlotsQuery(
    { userId: userId!, dayOfWeek: selectEnglishValue },
    { skip: selectEnglishValue === '' },
  );

  const totalSlots = registeredSlots?.day?.numberOfSlots ?? 0;

  const handleSelectValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newEnglishValue = event.target.value;
    const newSpanishValue = event.target.selectedOptions[0].text;
    setSelectEnglishValue(newEnglishValue);
    setSelectSpanishValue(newSpanishValue);
  };

  const openModal = (type: ModalType) => {
    setModalType(type);
    setShowModal(true);
  };

  const handleEditCapacityModal = async () => {
    const response = await editCapacityRef.current.submitForm();
    if (response) {
      updateSlotCapacity({ userId: userId!, capacity: response.capacity })
        .unwrap()
        .then(() => {
          setShowModal(false);
          toast.success('Capacidad actualizada');
        });
    }
  };

  const handleEditSlotModal = async () => {
    const response = await editSlotRef.current.submitForm();
    if (response) {
      updateSlot({ slotId: currentSlot?.id!, startTime: response.startTime })
        .unwrap()
        .then(() => {
          toast.success('Turno actualizado');
          setShowModal(false);
        });
    }
  };

  const handleDeleteSlot = async () => {
    setShowModal(false);
    deleteSlot({ slotId: currentSlot?.id! })
      .unwrap()
      .then(() => {
        toast.success('Turno eliminado');
      });
  };

  const handleCreateSlotModal = async () => {
    const response = await createSlotRef.current.submitForm();
    if (response) {
      createSlot({
        dayOfWeek: selectEnglishValue,
        startTime: response.startTime,
        userId: userId!,
      })
        .unwrap()
        .then(() => {
          setShowModal(false);
          toast.success('Turno registrado');
          setTimeout(() => {
            const elementId = `slot-${response.startTime.replace(':', '-')}`;
            const element = document.getElementById(elementId);
            if (element) {
              element.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
              });
              element.classList.add('highlight');
              setTimeout(() => {
                element.classList.remove('highlight');
              }, 1500);
            }
          }, 100);
        });
    }
  };

  const SlotConfigurationSkeleton = () => {
    const getPlaceholder = () => {
      if (isLoading) return 'Cargando...';
      if (isError) return 'Error al cargar capacidad';
      if (userPreferences?.capacity) return `${userPreferences.capacity} cupos por turno`;
      return 'Sin capacidad definida';
    };
    return (
      <s.ScreenContainer>
        <s.InputContainer>
          <s.EditContainer>
            <s.Label>Cupos disponibles</s.Label>
            <s.EditCapacity
              onClick={() => {
                openModal(ModalType.EDIT_CAPACITY);
              }}
            >
              Editar
              <img src={EditIcon} width={16} height={16} />
            </s.EditCapacity>
          </s.EditContainer>
          <s.Input disabled placeholder={getPlaceholder()} />
        </s.InputContainer>
        <s.InputContainer>
          <s.Label> Día del turno</s.Label>
          <s.SelectWrapper>
            <s.Select onChange={handleSelectValue} value={selectEnglishValue}>
              <option value="" disabled hidden>
                Seleccione un día
              </option>
              {Object.entries(DaysOfWeek).map(([key, value]) => (
                <option key={key} value={value}>
                  {key}
                </option>
              ))}
            </s.Select>
            <s.CaretIcon src={CaretIcon} alt="caret-icon" />
          </s.SelectWrapper>
        </s.InputContainer>
        <s.Button
          $isDisabled={selectEnglishValue === ''}
          disabled={selectEnglishValue === ''}
          onClick={() => {
            openModal(ModalType.CREATE);
          }}
        >
          Nuevo turno
          <img src={AddIcon} width={24} height={24} />
        </s.Button>
      </s.ScreenContainer>
    );
  };

  const VisualizeSlotsSkeleton = () => {
    return (
      <s.SlotsContainer>
        <s.TitlesContainer>
          <s.MainTitle>Turnos del {selectSpanishValue}</s.MainTitle>
          <s.Subtitle>
            {totalSlots}
            {totalSlots > 1 ? ' turnos registrados' : ' turno registrado'}
          </s.Subtitle>
        </s.TitlesContainer>
        {registeredSlots?.day?.slots?.map((slot, index) => (
          <s.SpecificSlotContainer
            key={slot.id}
            id={`slot-${slot.startTime.replace(':', '-')}`}
            $isLast={
              index === (registeredSlots?.day?.numberOfSlots ?? 0) - 1 &&
              (registeredSlots?.day?.numberOfSlots ?? 0) > 3
            }
          >
            <img src={CalendarIcon} width={30} height={30}></img>
            <s.SlotInfoContainer>
              <s.PrimaryText>
                {slot.startTime} - {slot.endTime}
              </s.PrimaryText>
              <s.SecondaryText>
                {slot.usedCapacity}/{slot.maxCapacity} cupos ocupados
              </s.SecondaryText>
            </s.SlotInfoContainer>
            <s.ActionsContainer>
              <s.IconButton>
                <img
                  src={EditIcon}
                  onClick={() => {
                    setCurrentSlot(slot);
                    openModal(ModalType.EDIT_START_TIME);
                  }}
                ></img>
              </s.IconButton>

              <s.IconButton>
                <img
                  src={DeleteIcon}
                  onClick={() => {
                    setCurrentSlot(slot);
                    openModal(ModalType.CONFIRM_DELETE);
                  }}
                ></img>
              </s.IconButton>
            </s.ActionsContainer>
          </s.SpecificSlotContainer>
        ))}
      </s.SlotsContainer>
    );
  };

  const NonExistingSlotsSkeleton = () => {
    return (
      <s.SlotsContainer>
        <s.TitlesContainer>
          <s.MainTitle>Turnos del {selectSpanishValue}</s.MainTitle>
          <s.Subtitle>No hay turnos registrados</s.Subtitle>
        </s.TitlesContainer>
        <s.InfoContainer>
          <s.CalendarIcon src={CalendarIcon}></s.CalendarIcon>
          <s.PrimaryText>Aún no existen turnos para este día</s.PrimaryText>
          <s.SecondaryText>Podés registrar tu primer turno</s.SecondaryText>
        </s.InfoContainer>
        <s.Button
          onClick={() => {
            openModal(ModalType.CREATE);
          }}
        >
          Crear primer turno
          <img src={AddIcon} width={24} height={24} />
        </s.Button>
      </s.SlotsContainer>
    );
  };

  const modalConfig: Record<ModalType, ModalProps> = {
    [ModalType.CREATE]: {
      contentRef: createSlotRef,
      children: <CreateSlotForm ref={createSlotRef} />,
      primaryButtonText: 'Guardar',
      secondaryButtonText: 'Cancelar',
      onConfirm: handleCreateSlotModal,
    },
    [ModalType.EDIT_CAPACITY]: {
      contentRef: editCapacityRef,
      children: <EditCapacityForm ref={editCapacityRef} />,
      primaryButtonText: 'Guardar',
      secondaryButtonText: 'Cancelar',
      onConfirm: handleEditCapacityModal,
    },
    [ModalType.EDIT_START_TIME]: {
      contentRef: editSlotRef,
      children: <EditSlotForm ref={editSlotRef} initialStartTime={currentSlot?.startTime} />,
      primaryButtonText: 'Guardar',
      secondaryButtonText: 'Cancelar',
      onConfirm: handleEditSlotModal,
    },
    [ModalType.CONFIRM_DELETE]: {
      contentRef: deleteSlotRef,
      children: <ConfirmDialog message="¿Estás seguro de que deseas eliminar el turno?" />,
      primaryButtonText: 'Eliminar',
      secondaryButtonText: 'Cancelar',
      onConfirm: handleDeleteSlot,
    },
  };

  return (
    <s.MainContainer>
      <s.Title>MIS TURNOS</s.Title>
      {modalType && (
        <Modal
          active={showModal}
          contentRef={modalConfig[modalType].contentRef}
          onCancel={() => setShowModal(false)}
          onConfirm={modalConfig[modalType].onConfirm}
          secondaryButtonText={modalConfig[modalType].secondaryButtonText}
          primaryButtonText={modalConfig[modalType].primaryButtonText}
        >
          {modalConfig[modalType].children}
        </Modal>
      )}
      <s.SkeletonsContainer>
        <SlotConfigurationSkeleton />
        {selectEnglishValue !== '' && (
          <s.AnimatedContainer>
            {totalSlots === 0 ? <NonExistingSlotsSkeleton /> : <VisualizeSlotsSkeleton />}
          </s.AnimatedContainer>
        )}
      </s.SkeletonsContainer>
    </s.MainContainer>
  );
}

export default SlotConfiguration;

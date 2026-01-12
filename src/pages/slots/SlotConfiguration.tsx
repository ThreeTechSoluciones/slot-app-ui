import {
    MainContainer,
    Label,
    Input,
    Button,
    Select,
    InputContainer,
    EditContainer,
    EditCapacity,
    SlotsContainer,
    Title,
    Subtitle,
    SpecificSlotContainer,
    SlotInfoContainer,
    PrimaryText,
    SecondaryText,
    TitlesContainer,
    ActionsContainer,
    ScreenContainer,
    MainTitle,
    SkeletonsContainer,
    InfoContainer,
    AnimatedContainer
} from "./SlotConfiguration.styles";
import EditIcon from "../../assets/edit-icon.png";
import EditSlotForm from "./forms/EditSlotForm";
import { useRef, useState } from "react";
import AddIcon from "../../assets/add-icon.svg";
import Modal from "../../components/modal/Modal";
import { DaysOfWeek } from "../../utils/DaysOfWeek";
import DeleteIcon from "../../assets/delete-icon.png";
import CalendarIcon from "../../assets/calendar-icon.png";
import CreateSlotForm from "./forms/CreateSlotForm";
import { useCreateSlotMutation, useDeleteSlotMutation, useUpdateSlotMutation } from "../../app/services/SlotService";
import useAuthentication from "../../hooks/useAuthentication";
import toast from "react-hot-toast";
import { ModalType, type ModalConfig } from "../../utils/SlotsModalsUtils";
import { useGetSlotsQuery } from "../../app/services/UserService";
import type { SlotResponse } from "../../app/types/responses/SlotResponse.type";
import EditCapacityForm from "./forms/EditCapacityForm";
import { ConfirmDialog } from "../../components/confirm_dialog/ConfirmDialog";


function SlotConfiguration() {

    const [showModal, setShowModal] = useState<boolean>(false);

    const [modalType, setModalType] = useState<ModalType>();

    const [currentSlot, setCurrentSlot] = useState<SlotResponse | null>(null);

    const [showConfirm, setShowConfirm] = useState(false);

    const { userId } = useAuthentication()

    const [createSlot] = useCreateSlotMutation();

    const [updateSlot] = useUpdateSlotMutation();

    const [deleteSlot] = useDeleteSlotMutation();

    const [selectEnglishValue, setSelectEnglishValue] = useState<string>("");

    const [selectSpanishValue, setSelectSpanishValue] = useState<string>("");

    const editCapacityRef = useRef<any>(null);

    const createSlotRef = useRef<any>(null);

    const editSlotRef = useRef<any>(null);


    const { data: registeredSlots } = useGetSlotsQuery(
        { userId: userId!, dayOfWeek: selectEnglishValue },
        { skip: selectEnglishValue === "" }
    );

    const totalSlots = registeredSlots?.slots.length || 0;

    const handleSelectValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newEnglishValue = event.target.value;
        const newSpanishValue = event.target.selectedOptions[0].text;
        setSelectEnglishValue(newEnglishValue);
        setSelectSpanishValue(newSpanishValue);
    }

    const openModal = (type: ModalType) => {
        setModalType(type);
        setShowModal(true);
    };

    const handleEditCapacityModal = async () => {
        const response = await editCapacityRef.current.submitForm();
        if (response) {
            setShowModal(false);
        }
    }

    const handleEditSlotModal = async () => {
        const response = await editSlotRef.current.submitForm();
        if (response) {
            updateSlot({ slotId: currentSlot?.slotId!, startTime: response.startTime })
                .unwrap()
                .then(() => {
                    toast.success("El turno ha sido actualizado")
                    setShowModal(false);
                });
        }
    }

    const handleDeleteSlot = () => {
        setShowConfirm(false);
        deleteSlot({ slotId: currentSlot?.slotId! })
            .unwrap()
            .then(() => {
                toast.success("El turno ha sido eliminado")
            });
    };

    const handleCreateSlotModal = async () => {
        const response = await createSlotRef.current.submitForm();
        if (response) {
            createSlot({ dayOfWeek: selectEnglishValue, startTime: response.startTime, userId: userId! })
                .unwrap()
                .then(() => {
                    setShowModal(false);
                    toast.success("El turno ha sido registrado")
                    setTimeout(() => {
                        const elementId = `slot-${response.startTime.replace(':', '-')}`;
                        const element = document.getElementById(elementId);
                        if (element) {
                            element.scrollIntoView({
                                behavior: 'smooth',
                                block: 'center'
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
        return (
            <ScreenContainer>
                <InputContainer>
                    <EditContainer>
                        <Label>Cupos disponibles</Label>
                        <EditCapacity onClick={() => { openModal(ModalType.EDIT_CAPACITY); }} >Editar
                            <img
                                src={EditIcon}
                                width={16}
                                height={16}
                            />
                        </EditCapacity>
                    </EditContainer>
                    <Input disabled placeholder="25 cupos por turno" />
                </InputContainer>
                <InputContainer>
                    <Label> Día del turno</Label>
                    <Select onChange={handleSelectValue} value={selectEnglishValue} defaultValue="">
                        <option value="" disabled hidden>Seleccione un día</option>
                        {Object.entries(DaysOfWeek).map(([key, value]) => (
                            <option key={key} value={value}>{key}</option>
                        ))}
                    </Select>
                </InputContainer>
                <Button $isDisabled={selectEnglishValue === ""} disabled={selectEnglishValue === ""} onClick={() => { openModal(ModalType.CREATE); }}>Nuevo turno
                    <img
                        src={AddIcon}
                        width={24}
                        height={24} />
                </Button>
            </ScreenContainer>
        )

    };

    const VisualizeSlotsSkeleton = () => {
        return (
            <SlotsContainer>
                <TitlesContainer>
                    <MainTitle>Turnos del {selectSpanishValue}</MainTitle>
                    <Subtitle>
                        {totalSlots}
                        {totalSlots > 1 ? " turnos registrados" : " turno registrado"}
                    </Subtitle>
                </TitlesContainer>
                {registeredSlots?.slots.map((slot, index) => (
                    <SpecificSlotContainer
                        key={slot.slotId}
                        id={`slot-${slot.startTime.replace(':', '-')}`}
                        $isLast={index === totalSlots - 1 && totalSlots > 3}
                    >
                        <img src={CalendarIcon} width={35} height={35}></img>
                        <SlotInfoContainer >
                            <PrimaryText>
                                {slot.startTime} - {slot.endTime}
                            </PrimaryText>
                            <SecondaryText>{slot.usedCapacity}/{slot.maxCapacity} cupos ocupados</SecondaryText>
                        </SlotInfoContainer>
                        <ActionsContainer>
                            <img src={EditIcon} width={"24px"} height={"24px"} onClick={() => {
                                setCurrentSlot(slot);
                                openModal(ModalType.EDIT_START_TIME);
                            }}>
                            </img>
                            <img src={DeleteIcon} width={"24px"} height={"24px"} onClick={() => {
                                setCurrentSlot(slot);
                                setShowConfirm(true);
                            }}>
                            </img>
                        </ActionsContainer>
                    </SpecificSlotContainer>
                ))
                }
            </SlotsContainer >
        )
    };

    const NonExistingSlotsSkeleton = () => {
        return (
            <SlotsContainer>
                <TitlesContainer>
                    <MainTitle>Turnos del {selectSpanishValue}</MainTitle>
                    <Subtitle>No hay turnos registrados</Subtitle>
                </TitlesContainer>
                <InfoContainer>
                    <img src={CalendarIcon} width={32} height={32}></img>
                    <PrimaryText>Aún no existen turnos para este día</PrimaryText>
                    <SecondaryText>Podés registrar tu primer turno</SecondaryText>
                </InfoContainer>
                <Button onClick={() => { openModal(ModalType.CREATE); }}>Crear primer turno
                    <img
                        src={AddIcon}
                        width={24}
                        height={24} />
                </Button>
            </SlotsContainer>
        )
    }

    const modalConfig: Record<ModalType, ModalConfig> = {
        [ModalType.CREATE]: {
            contentRef: createSlotRef,
            content: <CreateSlotForm ref={createSlotRef} />,
            onConfirm: handleCreateSlotModal
        },
        [ModalType.EDIT_CAPACITY]: {
            contentRef: editCapacityRef,
            content: <EditCapacityForm ref={editCapacityRef} />,
            onConfirm: handleEditCapacityModal
        },
        [ModalType.EDIT_START_TIME]: {
            contentRef: editSlotRef,
            content: <EditSlotForm ref={editSlotRef} initialStartTime={currentSlot?.startTime} />,
            onConfirm: handleEditSlotModal
        }
    }

    return (
        <MainContainer>
            <Title>MIS TURNOS</Title>
            {showModal && modalType && (
                <Modal
                    onClose={() => setShowModal(false)}
                    showButtons={true}
                    contentRef={modalConfig[modalType].contentRef}
                    onConfirm={modalConfig[modalType].onConfirm}
                >
                    {modalConfig[modalType].content}
                </Modal>
            )}
            {showConfirm && (
                <ConfirmDialog
                    message="¿Estás seguro de que quieres eliminar el turno?"
                    onConfirm={() => handleDeleteSlot()}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
            <SkeletonsContainer>
                <SlotConfigurationSkeleton />
                {selectEnglishValue !== "" && (
                    <AnimatedContainer>
                        {totalSlots === 0 ? <NonExistingSlotsSkeleton /> : <VisualizeSlotsSkeleton />}
                    </AnimatedContainer>
                )}
            </SkeletonsContainer>
        </MainContainer>
    )
};

export default SlotConfiguration;

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
    SlotInfo,
    TitlesContainer,
    ActionsContainer,
    ScreenContainer,
    MainTitle,
    SkeletonsContainer,
    InfoContainer,
    AnimatedContainer
} from "./SlotConfiguration.styles";
import EditIcon from "../../assets/edit-icon.png";
import EditSlotForm from "./forms/EditCapacityForm";
import { useRef, useState } from "react";
import AddIcon from "../../assets/add-icon.svg";
import Modal from "../../components/modal/Modal";
import { DaysOfWeek } from "../../utils/DaysOfWeek";
import ClockIcon from "../../assets/clock-icon.png";
import DeleteIcon from "../../assets/delete-icon.png";
import CalendarIcon from "../../assets/calendar-icon.png";
import CreateSlotForm from "./forms/CreateSlotForm";
import { useCreateSlotMutation } from "../../app/services/SlotService";
import useAuthentication from "../../hooks/useAuthentication";
import toast from "react-hot-toast";
import { ModalType, type ModalConfig } from "../../utils/SlotsModalsUtils";

function SlotConfiguration() {

    const [showModal, setShowModal] = useState<boolean>(false);

    const [modalType, setModalType] = useState<ModalType>();

    const [createSlot] = useCreateSlotMutation();

    const { userId } = useAuthentication()

    const [selectEnglishValue, setSelectEnglishValue] = useState<string>("");

    const [selectSpanishValue, setSelectSpanishValue] = useState<string>("");

    const handleSelectValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newEnglishValue = event.target.value;
        const newSpanishValue = event.target.selectedOptions[0].text;
        setSelectEnglishValue(newEnglishValue);
        setSelectSpanishValue(newSpanishValue);
    }

    const editCapacityRef = useRef<any>(null);

    const createSlotRef = useRef<any>(null);

    const handleEditCapacityModal = async () => {
        const response = await editCapacityRef.current.submitForm();
        if (response) {
            setShowModal(false);
        }
    }


    const handleCreateSlotModal = async () => {
        try {
            const response = await createSlotRef.current.submitForm();
            if (response) {
                await createSlot({ dayOfWeek: selectEnglishValue, startTime: response.startTime, userId }).unwrap();
                setShowModal(false);
                toast.success("El turno ha sido registrado")
            }
        } catch (error) {
            console.log(error)
        }
    };

    const SlotConfigurationSkeleton = () => {
        return (
            <ScreenContainer>
                <InputContainer>
                    <EditContainer>
                        <Label>Cupos disponibles</Label>
                        <EditCapacity onClick={() => { setShowModal(true); setModalType(ModalType.EDIT); }}>Editar
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
                <Button $isDisabled={selectEnglishValue === ""} disabled={selectEnglishValue === ""} onClick={() => { setShowModal(true); setModalType(ModalType.CREATE); }}>Nuevo turno
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
                    <Subtitle>1 turno registrado</Subtitle>
                </TitlesContainer>
                {/* Esto está hardcodeado porque falta el backend, se deberia recorrer
                 la lista de turnos y renderizar cada uno de los turnos existentes */}
                <SpecificSlotContainer>
                    <img src={ClockIcon} width={"24px"} height={"24px"}></img>
                    <SlotInfoContainer>
                        <SlotInfo>8:00-9:00</SlotInfo>
                        <SlotInfo $isDown={true}>9/10 cupos ocupados</SlotInfo>
                    </SlotInfoContainer>
                    <ActionsContainer>
                        <img src={EditIcon} width={"24px"} height={"24px"}></img>
                        <img src={DeleteIcon} width={"24px"} height={"24px"}></img>
                    </ActionsContainer>
                </SpecificSlotContainer>
            </SlotsContainer >
        )
    };

    {/* Acá cuando no existan turnos, se renderiza el mensaje. Falta el backend tambien */ }
    const NonExistingSlotsSkeleton = () => {
        return (
            <SlotsContainer>
                <TitlesContainer>
                    <MainTitle>Turnos del  {selectSpanishValue}</MainTitle>
                    <Subtitle>No hay turnos registrados</Subtitle>
                </TitlesContainer>
                <InfoContainer>
                    <img src={CalendarIcon} width={32} height={32}></img>
                    <SlotInfo $isBold={true}>No hay turnos registrados</SlotInfo>
                    <SlotInfo $isDown={true}>Podés registrar tu primer turno</SlotInfo>
                </InfoContainer>
                <Button onClick={() => { setShowModal(true); setModalType(ModalType.CREATE); }}>Crear primer turno
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
        [ModalType.EDIT]: {
            contentRef: editCapacityRef,
            content: <EditSlotForm ref={editCapacityRef} />,
            onConfirm: handleEditCapacityModal
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
            <SkeletonsContainer>
                <SlotConfigurationSkeleton />
                {selectEnglishValue !== "" && (
                    <AnimatedContainer>
                        <VisualizeSlotsSkeleton />
                    </AnimatedContainer>
                )}
                {/* <NonExistingSlotsSkeleton /> */}
            </SkeletonsContainer>
        </MainContainer>
    );
}
export default SlotConfiguration;

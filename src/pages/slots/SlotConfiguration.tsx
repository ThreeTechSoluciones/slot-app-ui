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
import TrashIcon from "../../assets/trash-icon.webp";
import CalendarIcon from "../../assets/calendar-icon.png";

function CreateSlot() {

    const [showModal, setShowModal] = useState<boolean>(false);

    const [selectValue, setSelectValue] = useState<string>("");

    const handleSelectValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = event.target.value;
        setSelectValue(newValue);
    }

    const editCapacityRef = useRef<any>(null);

    const handleConfirmModal = async () => {
        const response = await editCapacityRef.current.submitForm();
        if (response) {
            //llamo al backend para guardar los cambios
            setShowModal(false);
            //muestro una notificación de éxito
        }
    }

    const SlotConfigurationSkeleton = () => {
        return (
            <ScreenContainer>
                <InputContainer>
                    <EditContainer>
                        <Label>Cupos disponibles</Label>
                        <EditCapacity onClick={() => setShowModal(true)}>Editar
                            <img
                                src={EditIcon}
                                width={16}
                                height={16}
                            />
                        </EditCapacity>
                    </EditContainer>
                    <Input disabled placeholder="15 cupos por turno" />
                </InputContainer>
                <InputContainer>
                    <Label> Día del turno</Label>
                    <Select onChange={handleSelectValue} value={selectValue} defaultValue="">
                        <option value="" disabled hidden>Seleccione un día</option>
                        {Object.entries(DaysOfWeek).map(([key, value]) => (
                            <option key={key} value={value}>{key}</option>
                        ))}
                    </Select>
                </InputContainer>
                <Button $isDisabled={selectValue === ""}>Nuevo turno
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
                    <MainTitle>Turnos del Lunes</MainTitle>
                    <Subtitle>1 turno registrado</Subtitle>
                </TitlesContainer>
                <SpecificSlotContainer>
                    <img src={ClockIcon} width={"24px"} height={"24px"}></img>
                    <SlotInfoContainer>
                        <SlotInfo>8:00-9:00</SlotInfo>
                        <SlotInfo $isDown={true}>9/10 cupos ocupados</SlotInfo>
                    </SlotInfoContainer>
                    <ActionsContainer>
                        <img src={EditIcon} width={"24px"} height={"24px"}></img>
                        <img src={TrashIcon} width={"22px"} height={"22px"}></img>
                    </ActionsContainer>
                </SpecificSlotContainer>
            </SlotsContainer >
        )
    };

    const NonExistingSlotsSkeleton = () => {
        return (
            <SlotsContainer>
                <TitlesContainer>
                    <MainTitle>Turnos del Martes</MainTitle>
                    <Subtitle>No hay turnos registrados</Subtitle>
                </TitlesContainer>
                <InfoContainer>
                    <img src={CalendarIcon} width={32} height={32}></img>
                    <SlotInfo $isBold={true}>No hay turnos registrados</SlotInfo>
                    <SlotInfo $isDown={true}>Podés registrar tu primer turno</SlotInfo>
                </InfoContainer>
                <Button>Crear primer turno
                    <img
                        src={AddIcon}
                        width={24}
                        height={24} />
                </Button>
            </SlotsContainer>



        )
    }

    return (
        <MainContainer>
            <Title>MIS TURNOS</Title>
            {showModal && (
                <Modal
                    onClose={() => setShowModal(false)}
                    showButtons={true}
                    contentRef={editCapacityRef}
                    onConfirm={handleConfirmModal}
                >
                    <EditSlotForm ref={editCapacityRef} />
                </Modal>
            )}
            <SkeletonsContainer>
                <SlotConfigurationSkeleton />
                {selectValue !== "" && (
                    <AnimatedContainer>
                        <VisualizeSlotsSkeleton />
                    </AnimatedContainer>
                )}
                {/* <NonExistingSlotsSkeleton /> */}
            </SkeletonsContainer>
        </MainContainer>
    );
}
export default CreateSlot;

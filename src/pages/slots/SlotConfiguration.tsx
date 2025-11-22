import { MainContainer, Label, Input, Button, Select, InputContainer, EditContainer, EditCapacity, TitleContainer, Title, ScreenContainer } from "./SlotConfiguration.styles";
import EditIcon from "../../assets/edit-icon.png";
import EditSlotForm from "./forms/EditCapacityForm";
import { useRef, useState } from "react";
import AddIcon from "../../assets/add-icon.svg";
import Modal from "../../components/modal/Modal";
import { DaysOfWeek } from "../../utils/DaysOfWeek";

function CreateSlot() {

    const [showModal, setShowModal] = useState<boolean>(false);

    const editCapacityRef = useRef<any>(null);

    const handleConfirmModal = async () => {
        const response = await editCapacityRef.current.submitForm();
        if (response) {
            //llamo al backend para guardar los cambios
            setShowModal(false);
            //muestro una notificación de éxito
        }
    }

    return (
        <MainContainer>
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
            <TitleContainer>
                <Title> MIS TURNOS</Title>
            </TitleContainer>
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
                    <Select defaultValue="">
                        <option value="" disabled hidden>Seleccione un día</option>
                        {Object.entries(DaysOfWeek).map(([key, value]) => (
                            <option key={key} value={value}>{key}</option>
                        ))}
                    </Select>
                </InputContainer>
                <Button $isDisabled>Nuevo turno
                    <img
                        src={AddIcon}
                        width={24}
                        height={24} />
                </Button>
            </ScreenContainer>
        </MainContainer>
    );
}
export default CreateSlot;

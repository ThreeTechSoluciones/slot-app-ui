import { MainContainer, Label, Input, Button, Select, InputContainer, EditContainer, EditCapacity, TitleContainer, Title, ScreenContainer } from "./CreateSlot.styles";
import EditIcon from "../../assets/edit-icon.png";
import EditSlotForm from "./forms/EditCapacityForm";
import { useRef, useState } from "react";
import type { ReactNode } from "react";
import AddIcon from "../../assets/add-icon.svg";
import Modal from "../../components/modal/Modal";
import BackIcon from "../../assets/back-icon.png";
import { useNavigate } from "react-router-dom";

function CreateSlot() {



    const DaysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

    const [modal, setModal] = useState<ReactNode | null>(null);

    const editCapacityRef = useRef<any>(null);

    const navigate = useNavigate();

    return (
        <MainContainer>
            <TitleContainer>
                <Title>
                    <img
                        src={BackIcon}
                        alt="back-icon"
                        onClick={() => navigate(-1)}
                        style={{ cursor: "pointer" }}
                    ></img>
                    MIS TURNOS
                </Title>
            </TitleContainer>
            <ScreenContainer>
                <InputContainer>
                    <EditContainer>
                        <Label >Cupos disponibles</Label>
                        <EditCapacity onClick={() => setModal(<EditSlotForm />)}>Editar<img src={EditIcon} width={16} height={16}></img></EditCapacity>
                    </EditContainer>
                    {modal && (
                        <Modal onClose={() => setModal(false)} content={<EditSlotForm ref={editCapacityRef} />} showButtons={true} contentRef={editCapacityRef} onConfirm={() => {
                            // Vacío - el Modal ya llama a submitForm automáticamente
                        }} />
                    )}
                    <Input readOnly placeholder="15 cupos por turno" />
                </InputContainer>
                <InputContainer>
                    <Label>Día del turno</Label>
                    <Select defaultValue="">
                        <option value="" disabled hidden>Seleccione una opción</option>
                        {DaysOfWeek.map((day) => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </Select>
                </InputContainer>
                <Button $isDisabled>Nuevo turno <img src={AddIcon} width={24} height={24}></img></Button>
            </ScreenContainer>
        </MainContainer>
    );
}
export default CreateSlot;

import { MainContainer, Label, Input, Button, Select, InputContainer, EditContainer, EditCapacity } from "./CreateSlot.styles";
import EditIcon from "../../assets/edit-icon.png";
import EditSlotForm from "./forms/EditSlotForm";
import { useState } from "react";
import type { ReactNode } from "react";
import AddIcon from "../../assets/add-icon.svg";
import Modal from "../../components/modal/Modal";

function CreateSlot() {

    const DaysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

    const [modal, setModal] = useState<ReactNode | null>(null);

    return (
        <MainContainer>
            <InputContainer>
                <EditContainer>
                    <Label >Cupos disponibles</Label>
                    <EditCapacity onClick={() => setModal(<EditSlotForm />)}>Editar<img src={EditIcon} width={16} height={16}></img></EditCapacity>
                </EditContainer>
                {modal && (
                    <Modal onClose={() => setModal(false)} content={<EditSlotForm />} showButtons={true} />
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
        </MainContainer>
    );
}
export default CreateSlot;

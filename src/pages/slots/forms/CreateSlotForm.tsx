import { FormContainer, Input, Label, InputContainer } from "./EditCapacityForm.styles";


function CreateSlotForm() {
    return (
        <FormContainer>
            <InputContainer>
                <Label>Hora de inicio</Label>
                <Input placeholder="15:00" />
            </InputContainer>
        </FormContainer>
    )
}
export default CreateSlotForm;
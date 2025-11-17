import { FormContainer, Input, Label, InputContainer } from "./EditSlotForm.styles";


function EditSlotForm() {
    return (
        <FormContainer>
            <InputContainer>
                <Label>Cupos disponibles</Label>
                <Input placeholder="25" />
            </InputContainer>
        </FormContainer>
    )
}
export default EditSlotForm;
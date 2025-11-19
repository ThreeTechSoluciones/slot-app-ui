import { FormContainer, Input, Label, InputContainer, Button } from "./EditCapacityForm.styles";
import * as yup from "yup";
import { EditCapacityScheme } from "./EditCapacity.scheme";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../../../components/error_message/ErrorMessage";
import { forwardRef, useImperativeHandle } from 'react';

export interface EditSlotFormHandle {
    submitForm: () => void;
}


const EditSlotForm = forwardRef<EditSlotFormHandle>((props, ref) => {



    type FormData = yup.InferType<typeof EditCapacityScheme>;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(EditCapacityScheme),
    });

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    useImperativeHandle(ref, () => ({
        submitForm: () => {
            handleSubmit(onSubmit)();
        }
    }));

    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <InputContainer>
                <Label>Cupos disponibles</Label>
                <Input {...register("capacity")} placeholder="25" />
                <ErrorMessage error={errors.capacity} />
            </InputContainer>
        </FormContainer>
    )
});

EditSlotForm.displayName = 'EditSlotForm';
export default EditSlotForm;
import { useForm } from "react-hook-form";
import { SlotScheme } from "./Slot.scheme";
import { FormContainer, Input, Label, InputContainer } from "./Forms.styles";
import { forwardRef, useImperativeHandle } from 'react';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "../../../components/error_message/ErrorMessage";
import type { FormSubmitHandle } from "./FormSubmitHandle.type";



interface EditSlotFormProps {
    initialStartTime?: string;
}

const EditSlotForm = forwardRef<FormSubmitHandle, EditSlotFormProps>(
    ({ initialStartTime }, ref) => {
        type FormData = yup.InferType<typeof SlotScheme>;
        const {
            register,
            handleSubmit,
            formState: { errors },
        } = useForm<FormData>({
            resolver: yupResolver(SlotScheme),
        });

        const onSubmit = async (data: FormData) => {
            return data;
        };

        useImperativeHandle(ref, () => ({
            submitForm: () =>
                new Promise<FormData | undefined>((resolve) => {
                    handleSubmit(
                        async (data) => {
                            try {
                                const response = await onSubmit(data);
                                resolve(response);
                            } catch (e) {
                                resolve(undefined);
                            }
                        },
                        () => {
                            resolve(undefined);
                        }
                    )();
                }),
        }));


        return (
            <FormContainer onSubmit={handleSubmit(onSubmit)}>
                <InputContainer>
                    <Label>Nueva hora de inicio</Label>
                    <Input placeholder={`Hora actual: ${initialStartTime}`} {...register("startTime")} />
                    <ErrorMessage error={errors.startTime} />
                </InputContainer>
            </FormContainer>
        )
    })

EditSlotForm.displayName = 'EditSlotForm';
export default EditSlotForm;
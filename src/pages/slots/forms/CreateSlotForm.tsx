import { useForm } from 'react-hook-form';
import { SlotScheme } from './Slot.scheme';
import { FormContainer, Input, Label, InputContainer } from './Forms.styles';
import { forwardRef, useImperativeHandle } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '../../../components/error_message/ErrorMessage';
import type { FormSubmitHandle } from './FormSubmitHandle.type';

const CreateSlotForm = forwardRef<FormSubmitHandle>((_props, ref) => {
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
          },
        )();
      }),
  }));

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <Label>Hora de inicio</Label>
        <Input autoFocus placeholder="15:00" {...register('startTime')} />
        <ErrorMessage error={errors.startTime} />
      </InputContainer>
    </FormContainer>
  );
});

CreateSlotForm.displayName = 'CreateSlotForm';
export default CreateSlotForm;

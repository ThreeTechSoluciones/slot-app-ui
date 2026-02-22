import { FormContainer, Input, Label, InputContainer } from './Forms.styles';
import * as yup from 'yup';
import { EditCapacityScheme } from './EditCapacity.scheme';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '../../../components/error_message/ErrorMessage';
import { forwardRef, useImperativeHandle } from 'react';
import type { FormSubmitHandle } from './FormSubmitHandle.type';

const EditCapacityForm = forwardRef<FormSubmitHandle>((props, ref) => {
  type FormData = yup.InferType<typeof EditCapacityScheme>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(EditCapacityScheme),
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
        <Label>Cupos disponibles</Label>
        <Input {...register('capacity')} placeholder="25" />
        <ErrorMessage error={errors.capacity} />
      </InputContainer>
    </FormContainer>
  );
});

EditCapacityForm.displayName = 'EditCapacityForm';
export default EditCapacityForm;

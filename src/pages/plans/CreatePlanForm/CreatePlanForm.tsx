import { forwardRef, useImperativeHandle } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as s from "./CreatePlanForm.styles"
import { createPlanSchema } from "./CreatePlanForm.scheme";
import type { FormProp } from "../../../app/types/FormProp";
import { ErrorMessage } from "../../../components/error_message/ErrorMessage";
import CurrencyInput from "../../../utils/InputPrice/CurrencyInput";
import SpinInput from "../../../components/number_input/SpinInput";

export interface CreatePlanProp {
  name: string;
  numberOfDays: number;
  amount: number;
}

const CreatePlanForm = forwardRef<
  FormProp<CreatePlanProp>,
  FormProp<CreatePlanProp>
>((props, ref) => {
  const { data } = props;
  const planForm = data;

  type FormData = CreatePlanProp;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(createPlanSchema),
    defaultValues: {
      ...planForm,
    },
  });

  useImperativeHandle(
    ref,
    () =>
    ({
      submit: () =>
        new Promise<CreatePlanProp | null>((resolve) => {
          handleSubmit(
            (data) => {
              resolve(data);
            },
            () => {
              resolve(null);
            }
          )();
        }),
    } as unknown as FormProp<CreatePlanProp>)
  );

  return (
    <s.FormStyle>
      <s.InputContainer>
        <s.LabelStyle>Nombre del plan</s.LabelStyle>
        <s.InputWrapper>
          <s.InputStyle placeholder="Ej: Pase Libre" {...register("name")} />
          <ErrorMessage error={errors.name} />
        </s.InputWrapper>
      </s.InputContainer>
      <s.InputContainer>
        <s.LabelStyle>Cantidad de días por semana</s.LabelStyle>
        <Controller
          name="numberOfDays"
          control={control}
          render={({ field }) => (
            <SpinInput
              value={field.value}
              onChange={field.onChange}
              min={1}
              max={7}
              placeholder="Cantidad de días"
            />
          )}
        />
        <ErrorMessage error={errors.numberOfDays} />
      </s.InputContainer>
      <s.InputContainer>
        <s.LabelStyle>Precio</s.LabelStyle>
        <s.InputWrapper>
          <Controller
            name="amount"
            control={control}
            defaultValue={undefined}
            render={({ field }) => (
              <CurrencyInput
                value={field.value ?? null}
                onChange={field.onChange}
                width="400"
                placeholder="Ej: $ 35.000,00"
              />
            )}
          />
          <ErrorMessage error={errors.amount} />
        </s.InputWrapper>
      </s.InputContainer>
    </s.FormStyle>
  );
});

CreatePlanForm.displayName = "CreatePlanForm";
export default CreatePlanForm;

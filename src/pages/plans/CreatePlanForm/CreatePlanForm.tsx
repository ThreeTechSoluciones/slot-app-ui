import { forwardRef, useImperativeHandle } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  FormStyle,
  InputContainer,
  LabelStyle,
  InputWrapper,
  InputStyle,
  NumberInputContainer,
  InputFieldWrapper,
  SpinButton,
  ErrorWrapper,
} from "./CreatePlanForm.styles";

import AddIcon from "../../../assets/add-icon.svg";
import LessIcon from "../../../assets/less-icon.svg";
import { createPlanSchema } from "./CreatePlanForm.scheme";
import type { FormProp } from "../../../app/types/FormProp";
import { ErrorMessage } from "../../../components/error_message/ErrorMessage";
import CurrencyInput from "../../../utils/InputPrice/CurrencyInput";

export interface CreatePlanProp {
  name: string;
  numberOfDays: number;
  amount: number;
}

const CreatePlanForm = forwardRef<
  FormProp<CreatePlanProp>,
  FormProp<CreatePlanProp>
>((props, ref) => {
  const { data, onSubmit } = props;
  const planForm = data;

  type FormData = CreatePlanProp;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(createPlanSchema),
    defaultValues: {
      ...planForm,
    },
  });

  const numberOfDays = watch("numberOfDays");

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
    <FormStyle>
      <InputContainer>
        <LabelStyle>Nombre del plan*</LabelStyle>
        <InputWrapper>
          <InputStyle placeholder="Ej: Pase Libre" {...register("name")} />
          <ErrorWrapper>
            <ErrorMessage error={errors.name} />
          </ErrorWrapper>
        </InputWrapper>
      </InputContainer>

      <InputContainer>
        <LabelStyle>Cantidad de días por semana*</LabelStyle>
        <NumberInputContainer>
          <InputFieldWrapper>
            <InputWrapper>
              <InputStyle placeholder="Ej: 5" {...register("numberOfDays")} />
              <ErrorWrapper>
                <ErrorMessage error={errors.numberOfDays} />
              </ErrorWrapper>
            </InputWrapper>

            <SpinButton
              type="button"
              style={{ right: "72px" }}
              onClick={() =>
                setValue("numberOfDays", Math.max(1, numberOfDays - 1))
              }
            >
              <img src={LessIcon} />
            </SpinButton>

            <SpinButton
              type="button"
              style={{ right: "24px" }}
              onClick={() =>
                setValue("numberOfDays", Math.min(7, numberOfDays + 1))
              }
            >
              <img src={AddIcon} />
            </SpinButton>
          </InputFieldWrapper>
        </NumberInputContainer>
      </InputContainer>

      <InputContainer>
        <LabelStyle>Precio*</LabelStyle>
        <InputWrapper>
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
          <ErrorWrapper>
            <ErrorMessage error={errors.amount} />
          </ErrorWrapper>
        </InputWrapper>
      </InputContainer>
    </FormStyle>
  );
});

CreatePlanForm.displayName = "CreatePlanForm";
export default CreatePlanForm;

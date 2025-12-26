import { forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  FormStyle,
  InputContainer,
  LabelStyle,
  InputWrapper,
  InputStyle,
  NumberInputContainer,
  SpinButton,
} from "./CreatePlanForm.styles";

import AddIcon from "../../../assets/add-icon.svg";
import LessIcon from "../../../assets/less-icon.svg";
import { createPlanSchema } from "./CreatePlanForm.scheme";
import type { FormProp } from "../../../app/types/FormProp";
import { ErrorMessage } from "../../../components/error_message/ErrorMessage";

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
          <ErrorMessage error={errors.name} />
        </InputWrapper>
      </InputContainer>

      <InputContainer>
        <LabelStyle>Cantidad de días por semana*</LabelStyle>
        <NumberInputContainer>
          <InputWrapper>
            <InputStyle
              type="number"
              placeholder="Ej: 5"
              {...register("numberOfDays")}
            />
            <ErrorMessage error={errors.numberOfDays} />
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
        </NumberInputContainer>
      </InputContainer>

      <InputContainer>
        <LabelStyle>Precio*</LabelStyle>
        <InputWrapper>
          <InputStyle
            type="number"
            placeholder="Ej: 35000"
            {...register("amount")}
          />
          <ErrorMessage error={errors.amount} />
        </InputWrapper>
      </InputContainer>
    </FormStyle>
  );
});

CreatePlanForm.displayName = "CreatePlanForm";
export default CreatePlanForm;

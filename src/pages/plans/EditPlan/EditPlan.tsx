import { forwardRef, useImperativeHandle } from "react";
import {
  FormStyle,
  InfoContainer,
  InfoStyle,
  InfoValue,
  InputGroup,
  Description,
  InputStyle,
  InputWrapper,
  LabelStyle,
  RowContainer,
} from "./EditPlan.styles";
import { formatCurrency } from "../../../utils/Formatter";
import type { FormProp } from "../../../app/types/FormProp";
import { editPlanSchema } from "./EditPlan.scheme";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../../../components/error_message/ErrorMessage";
export interface EditPlanFormData {
  amount: number;
  startDate: string;
}
export interface EditPlanFormProps {
  planId: string;
  planName: string;
  numberOfDays: number;
  currentAmount: number;
}
const EditPlanForm = forwardRef<FormProp<any>, EditPlanFormProps>(
  (props, ref) => {
    const { planId, planName, numberOfDays, currentAmount } = props;

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<EditPlanFormData>({
      resolver: yupResolver(editPlanSchema),
      defaultValues: {
        amount: undefined,
        startDate: new Date().toISOString().split("T")[0],
      },
    });

    useImperativeHandle(
      ref,
      () =>
        ({
          submit: () =>
            new Promise((resolve) => {
              handleSubmit(
                (data) => {
                  resolve({ planId, ...data });
                },
                () => {
                  resolve(null);
                }
              )();
            }),
        } as unknown as FormProp<EditPlanFormProps>)
    );

    return (
      <FormStyle>
        <InfoContainer>
          <InfoStyle>
            <LabelStyle>Nombre del plan*</LabelStyle>
            <InfoValue value={planName} readOnly />
          </InfoStyle>

          <InfoStyle>
            <LabelStyle>Cantidad de días por semana*</LabelStyle>
            <InfoValue value={numberOfDays} readOnly />
          </InfoStyle>

          <InfoStyle>
            <LabelStyle>Precio vigente</LabelStyle>
            <InfoValue value={formatCurrency(currentAmount)} readOnly />
          </InfoStyle>
        </InfoContainer>
        <InputGroup>
          <LabelStyle>Actualizar precio (opcional)</LabelStyle>

          <Description>
            Ingresá el nuevo monto y la fecha a partir de la cual será válido
          </Description>

          <RowContainer>
            <InputWrapper>
              <InputStyle
                min={0}
                placeholder="Nuevo precio"
                {...register("amount")}
              />
              <ErrorMessage error={errors.amount} />
            </InputWrapper>

            <InputWrapper>
              <InputStyle
                placeholder="Fecha de inicio"
                {...register("startDate")}
              />
              <ErrorMessage error={errors.startDate} />
            </InputWrapper>
          </RowContainer>
        </InputGroup>
      </FormStyle>
    );
  }
);

EditPlanForm.displayName = "EditPlanForm";

export default EditPlanForm;

import { forwardRef, useImperativeHandle } from "react";
import {
  FormStyle,
  InfoContainer,
  InputContainer,
  Input,
  EditPriceOptionContainer,
  Description,
  DatePickerCustomWrapper,
  InputWrapper,
  Label,
  EditPriceInputs,
} from "./EditPlan.styles";
import { formatCurrency } from "../../../utils/Formatter";
import type { FormProp } from "../../../app/types/FormProp";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "../../../components/error_message/ErrorMessage";
import SpinInput from "../../../components/number_input/SpinInput";
import CurrencyInput from "../../../utils/InputPrice/CurrencyInput";
import InputDate from "../../../components/date/inputDate";
import CalendarIcon from "../../../assets/calendar-icon.svg";
import { editPlanSchema } from "./EditPlan.scheme";

export interface EditPlanFormData {
  name: string;
  numberOfDays: number;
  amount?: number;
  startDate: Date;
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
      handleSubmit,
      control,
      formState: { errors },
    } = useForm<EditPlanFormData>({
      resolver: yupResolver(editPlanSchema),
      defaultValues: {
        name: planName,
        numberOfDays: numberOfDays,
        amount: undefined,
        startDate: new Date(),
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
          <InputContainer>
            <Label>Nombre del plan</Label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input {...field} />
              )}
            />
            <ErrorMessage error={errors.name} />
          </InputContainer>
          <InputContainer>
            <Label>Cantidad de días por semana</Label>
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
          </InputContainer>
          <InputContainer>
            <Label>Precio vigente</Label>
            <Input $isNonEditable={true} value={formatCurrency(currentAmount!)} readOnly />
          </InputContainer>
        </InfoContainer>
        <EditPriceOptionContainer>
          <Label>Actualizar precio (opcional)</Label>
          <Description> Ingresá el nuevo monto y la fecha a partir de la cual será válido.</Description>
          <EditPriceInputs>
            <InputWrapper>
              <Controller
                name="amount"
                control={control}
                defaultValue={undefined}
                render={({ field }) => (
                  <CurrencyInput
                    value={field.value ?? null}
                    onChange={field.onChange}
                    width="100%"
                    placeholder="Nuevo precio"
                  />
                )}
              />
              <ErrorMessage error={errors.amount} />
            </InputWrapper>
            <InputWrapper>
              <DatePickerCustomWrapper>
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field }) => (
                    <InputDate
                      {...field}
                      value={field.value}
                      onChange={(date) => field.onChange(date)}
                      clearIcon={null}
                      format="dd/MM/yyyy"
                      calendarPosition="top"
                      calendarIcon={
                        <img
                          src={CalendarIcon}
                          alt="Calendario"
                          style={{ width: 20, height: 20 }}
                        />
                      }
                    />
                  )}
                />
              </DatePickerCustomWrapper>
              <ErrorMessage error={errors.startDate} />
            </InputWrapper>
          </EditPriceInputs>
        </EditPriceOptionContainer>
      </FormStyle>
    );
  }
);

EditPlanForm.displayName = "EditPlanForm";

export default EditPlanForm;
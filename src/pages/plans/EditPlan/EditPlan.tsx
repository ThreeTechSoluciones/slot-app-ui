import { forwardRef, useImperativeHandle } from "react";
import {
  FormStyle,
  InfoContainer,
  InfoStyle,
  InfoValue,
  InputGroup,
  Description,
  DatePickerCustomWrapper,
  InputWrapper,
  LabelStyle,
  ErrorWrapper,
  RowContainer,
} from "./EditPlan.styles";
import { formatCurrency } from "../../../utils/Formatter";
import type { FormProp } from "../../../app/types/FormProp";
import { editPlanSchema } from "./EditPlan.scheme";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "../../../components/error_message/ErrorMessage";
import CurrencyInput from "../../../utils/InputPrice/CurrencyInput";
import InputDate from "../../../components/date/inputDate";
import CalendarIcon from "../../../assets/calendar-icon.svg";
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
      handleSubmit,
      control,
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
            Ingresá el nuevo monto y la fecha a partir de la cual será válido.
          </Description>

          <RowContainer>
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
              <ErrorWrapper>
                <ErrorMessage error={errors.amount} />
              </ErrorWrapper>
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
              <ErrorWrapper>
                <ErrorMessage error={errors.startDate} />
              </ErrorWrapper>
            </InputWrapper>
          </RowContainer>
        </InputGroup>
      </FormStyle>
    );
  }
);

EditPlanForm.displayName = "EditPlanForm";

export default EditPlanForm;

import { forwardRef, useImperativeHandle } from 'react';
import * as s from './EditPlan.styles';
import { formatCurrency } from '../../../utils/Formatter';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '../../../components/error_message/ErrorMessage';
import CurrencyInput from '../../../utils/InputPrice/CurrencyInput';
import InputDate from '../../../components/date/inputDate';
import CalendarIcon from '../../../assets/calendar-icon.svg';
import { editPlanSchema } from './EditPlan.scheme';
import * as yup from 'yup';
import type { FormProps } from '../../../app/types/FormProp';

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

const EditPlanForm = forwardRef<FormProps<EditPlanFormData>, EditPlanFormProps>((props, ref) => {
  type FormData = yup.InferType<typeof editPlanSchema>;
  const { planId, planName, numberOfDays, currentAmount } = props;
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(editPlanSchema) as any,
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
              },
            )();
          }),
      }) as unknown as FormProps<EditPlanFormData>,
  );

  return (
    <s.FormStyle>
      <s.InfoContainer>
        <s.InputContainer>
          <s.Label>Nombre del plan</s.Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <s.Input {...field} autoFocus />}
          />
          <ErrorMessage error={errors.name} />
        </s.InputContainer>
        <s.InputContainer>
          <s.Label>Cantidad de días por semana</s.Label>
          <s.Input $isNonEditable={true} value={numberOfDays} readOnly />
          <ErrorMessage error={errors.numberOfDays} />
        </s.InputContainer>
        <s.InputContainer>
          <s.Label>Precio vigente</s.Label>
          <s.Input $isNonEditable={true} value={formatCurrency(currentAmount!)} readOnly />
        </s.InputContainer>
      </s.InfoContainer>
      <s.EditPriceOptionContainer>
        <s.Label>Actualizar precio (opcional)</s.Label>
        <s.Description>
          {' '}
          Ingresá el nuevo monto y la fecha a partir de la cual será válido.
        </s.Description>
        <s.EditPriceInputs>
          <s.InputWrapper>
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
          </s.InputWrapper>
          <s.InputWrapper>
            <s.DatePickerCustomWrapper>
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
                      <img src={CalendarIcon} alt="Calendario" style={{ width: 20, height: 20 }} />
                    }
                  />
                )}
              />
            </s.DatePickerCustomWrapper>
            <ErrorMessage error={errors.startDate} />
          </s.InputWrapper>
        </s.EditPriceInputs>
      </s.EditPriceOptionContainer>
    </s.FormStyle>
  );
});

EditPlanForm.displayName = 'EditPlanForm';

export default EditPlanForm;

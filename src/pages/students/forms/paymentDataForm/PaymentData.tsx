import * as s from './PaymentData.styles';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { paymentDataScheme } from './PaymentData.scheme';
import { ErrorMessage } from '../../../../components/error_message/ErrorMessage';
import type { FormProps } from '../../../../app/types/FormProp';
import type { FormRef } from '../../../../app/types/FormRef';
import { PaymentPlanName, PlanTypeNameArray } from '../../../../app/types/models/PaymentPlanName';
import CurrencyInput from '../../../../utils/InputPrice/CurrencyInput';
import { forwardRef, useImperativeHandle } from 'react';

export interface PaymentDataProps {
  paymentPlanName: string;
  extraClasses?: number | null;
  classPrice?: number | null;
  paymentDay?: number;
}

const PaymentData = forwardRef<FormRef, FormProps<PaymentDataProps>>((props, ref) => {
  const { data, onSubmit: onSubmit, actionType } = props;

  type FormData = yup.InferType<typeof paymentDataScheme>;

  const DEFAULT_PAYMENT_DATA: PaymentDataProps = {
    paymentPlanName: '',
  };

  const studentRegistrationForm = data ?? DEFAULT_PAYMENT_DATA;

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(paymentDataScheme) as any,
    defaultValues: { ...studentRegistrationForm },
    context: {
      actionType: actionType,
    },
  });

  const PaymentPlanNameSelected = watch('paymentPlanName');

  const NoPaymentSelectedSkeleton = () => {
    return (
      <s.FieldContainer>
        <s.Text $isRegister={actionType !== 'edit'}>
          Este campo se habilitará una vez seleccione el plan de pago.
        </s.Text>
        <s.Input disabled={PaymentPlanNameSelected === ''}></s.Input>
      </s.FieldContainer>
    );
  };
  const SpecificDaySkeleton = () => {
    return (
      <s.FieldContainer>
        <s.Label>Día de pago</s.Label>
        <s.Input placeholder="15" {...register('paymentDay')} />
        <ErrorMessage error={errors.paymentDay} />
      </s.FieldContainer>
    );
  };
  const BeginningOfMonthSkeleton = () => {
    return (
      <s.InputsContainer>
        <s.Text $isRegister={actionType !== 'edit'}>
          Este campo se habilitará una vez seleccione el plan de pago.
        </s.Text>
        <s.SecondaryInputsContainer>
          <s.FieldContainer>
            <s.Label>Clases extras</s.Label>
            <s.Input placeholder="Clases extras" {...register('extraClasses')}></s.Input>
            <ErrorMessage error={errors.extraClasses} />
          </s.FieldContainer>
          <s.FieldContainer>
            <s.Label>Precio clase individual</s.Label>
            <Controller
              name="classPrice"
              control={control}
              render={({ field }) => (
                <CurrencyInput
                  width="100%"
                  value={field.value ?? null}
                  onChange={field.onChange}
                  placeholder="Precio clase individual"
                />
              )}
            />
            <ErrorMessage error={errors.classPrice} />
          </s.FieldContainer>
        </s.SecondaryInputsContainer>
      </s.InputsContainer>
    );
  };

  useImperativeHandle(ref, () => ({
    submit: () =>
      new Promise<boolean>((resolve) => {
        handleSubmit(
          (data) => {
            onSubmit?.({ ...data });
            resolve(true);
          },
          () => {
            resolve(false);
          },
        )();
      }),
  }));

  return (
    <s.MainContainer>
      <s.FormContainer>
        <s.FieldContainer>
          <s.Label>Plan de pago</s.Label>
          <Controller
            name="paymentPlanName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <s.Select
                {...field}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value);

                  if (value === PaymentPlanName.BEGINNING_OF_MONTH) {
                    setValue('paymentDay', undefined);
                  }

                  if (value === PaymentPlanName.SPECIFIC_DAY) {
                    setValue('extraClasses', undefined);
                    setValue('classPrice', undefined);
                  }
                }}
              >
                <option value="" disabled hidden>
                  Seleccione una opción
                </option>
                {PlanTypeNameArray.map((planType) => (
                  <option key={planType} value={planType}>
                    {planType}
                  </option>
                ))}
              </s.Select>
            )}
          />

          <ErrorMessage error={errors.paymentPlanName} />
        </s.FieldContainer>
        <s.FieldContainer>
          {PaymentPlanNameSelected === '' && <NoPaymentSelectedSkeleton />}
          {PaymentPlanNameSelected === PaymentPlanName.SPECIFIC_DAY && <SpecificDaySkeleton />}
          {PaymentPlanNameSelected === PaymentPlanName.BEGINNING_OF_MONTH &&
            actionType !== 'edit' && <BeginningOfMonthSkeleton />}
        </s.FieldContainer>
      </s.FormContainer>
    </s.MainContainer>
  );
});

PaymentData.displayName = 'PaymentDataForm';
export default PaymentData;

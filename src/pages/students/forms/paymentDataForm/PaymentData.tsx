import {
  MainContainer,
  FormContainer,
  Label,
  Input,
  Select,
  InputsContainer,
  Text,
  SecondaryInputsContainer
} from "./PaymentData.styles";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { paymentDataScheme } from "./PaymentData.scheme";
import { ErrorMessage } from "../../../../components/error_message/ErrorMessage"
import type { FormProp } from "../../create-student/FormProp.type";
import { PaymentPlanName, PlanTypeNameArray } from "../../../../app/types/models/PaymentPlanName";
import CurrencyInput from "../../../../utils/InputPrice/CurrencyInput"
import { forwardRef, useImperativeHandle } from "react";

export interface PaymentDataProps {
  paymentPlanName: string;
  extraClasses?: number | null | undefined;
  classPrice?: number | null | undefined;
  paymentDay?: number | undefined;
}

const PaymentData = forwardRef<FormProp<PaymentDataProps>, FormProp<PaymentDataProps>>((props, ref) => {

  const { data, onSubmit: onSubmit, actionType } = props;

  type FormData = yup.InferType<typeof paymentDataScheme>;

  const DEFAULT_PAYMENT_DATA: PaymentDataProps = {
    paymentPlanName: "",
    extraClasses: null,
    classPrice: undefined,
    paymentDay: undefined
  };

  const studentRegistrationForm = data || DEFAULT_PAYMENT_DATA;

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(paymentDataScheme) as any,
    defaultValues: { ...studentRegistrationForm },
  });

  const PaymentPlanNameSelected = watch("paymentPlanName");

  const NoPaymentSelectedSkeleton = () => {
    return (
      <div>
        <Text>Este campo se habilitará una vez seleccione el plan de pago</Text>
        <Input disabled={PaymentPlanNameSelected === ""}></Input>
      </div>
    )
  }
  const SpecificDaySkeleton = () => {
    return (
      <>
        <Label>Día de pago</Label>
        <Input placeholder="15"  {...register("paymentDay")} />
        <ErrorMessage error={errors.paymentDay} />
      </>
    )
  }
  const BeginningOfMonthSkeleton = () => {
    {
      if (actionType !== 'edit') {
        return (
          <InputsContainer>
            <Text>Si el alumno empezó luego del día 10, puede indicar
              la cantidad de clases extras para realizar el primer pago</Text>
            <SecondaryInputsContainer>
              <div>
                <Label>Clases extras</Label>
                <Input $isSmallSize placeholder="Clases extras" {...register("extraClasses")}></Input>
                <ErrorMessage error={errors.extraClasses} />
              </div>
              <div>
                <Label>Precio clase individual</Label>
                <Controller
                  name="classPrice"
                  control={control}
                  render={({ field }) => (

                    <CurrencyInput
                      width="176"
                      value={field.value ?? null}
                      onChange={field.onChange}
                      placeholder="Precio clase individual"
                    />
                  )}
                />
                <ErrorMessage error={errors.classPrice} />
              </div>
            </SecondaryInputsContainer>
          </InputsContainer>
        )
      }
    }
  }


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
          }
        )();
      })
  }) as unknown as FormProp<PaymentDataProps>);

  return (
    <MainContainer>
      <FormContainer>
        <div>
          <Label>Plan de pago</Label>
          <Select {...register("paymentPlanName")} defaultValue="">
            <option value="" disabled hidden>Seleccione una opción</option>
            {PlanTypeNameArray.map((planType) => (
              <option key={planType} value={planType}>{planType}</option>
            ))}
          </Select>
          <ErrorMessage error={errors.paymentPlanName} />
        </div>
        <div>
          <Label></Label>
          {PaymentPlanNameSelected === "" && (
            <NoPaymentSelectedSkeleton />
          )}
          {PaymentPlanNameSelected === PaymentPlanName.SPECIFIC_DAY && (
            <SpecificDaySkeleton />
          )}
          {PaymentPlanNameSelected === PaymentPlanName.BEGINNING_OF_MONTH && (
            <BeginningOfMonthSkeleton />)}
        </div>
      </FormContainer>
    </MainContainer>
  )
});


PaymentData.displayName = 'PaymentDataForm';
export default PaymentData;
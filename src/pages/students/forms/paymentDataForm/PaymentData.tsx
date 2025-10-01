import { MainContainer, 
        FormContainer, 
        Label, 
        Input, 
        Button, 
        ButtonsContainer, 
        Select, 
        SmallInput, 
        InputsContainer,
        Text} from "./PaymentData.styles";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { paymentDataScheme } from "./PaymentData.scheme";
import { ErrorMessage} from "../../../../components/error_message/ErrorMessage"
import type { FormProp } from "../../create-student/FormProp.type";
import { PaymentPlanName, PlanTypeNameArray} from "../../../../app/types/models/PaymentPlanName";
import { useState } from "react";
import { CurrencyInput } from "./CurrencyInput";

export interface PaymentDataProps {
    paymentPlanName:string;
    extraClasses?: number|null|undefined;
    classPrice?:number|null|undefined;
    paymentDay?: number |undefined;
}

function PaymentData({
  onNext,
  onBack,
  data
}: FormProp<PaymentDataProps>) {

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
    defaultValues:{...studentRegistrationForm},
  });

  const PaymentPlanNameSelected = watch("paymentPlanName");

  const onSubmit = (paymentData: FormData) => {
     onNext({...paymentData})
  };
  const [price, setPrice] = useState<number | undefined>(undefined);
  
    return(
      <MainContainer>
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label>Forma de pago</Label>
            <Select {...register("paymentPlanName")}>Plan de pago*
                <option value="" disabled selected>Seleccione una opción</option>
                {PlanTypeNameArray.map((planType) => (
                  <option key={planType} value={planType}>{planType}</option>
                ))}
            </Select>
            <ErrorMessage error={errors.paymentPlanName} />
          </div>
          <div>
            <Label>Datos del pago</Label>
              {PaymentPlanNameSelected === "" && (
                <div>
                  <Text>Este campo se habilitará una vez seleccione el plan de pago</Text>
                  <Input disabled={PaymentPlanNameSelected===""}></Input>
                </div>)}
              {PaymentPlanNameSelected === PaymentPlanName.DIA_ESPECIFICO && (
                <>
                  <Input placeholder="Día de pago"  {...register("paymentDay")}/>
                  <ErrorMessage error={errors.paymentDay} /></>
              )}
              {PaymentPlanNameSelected=== PaymentPlanName.PRINCIPIO_MES && (
                <InputsContainer>
                  <div>
                    <SmallInput placeholder="Clases extras" {...register("extraClasses")}></SmallInput>
                    <ErrorMessage error={errors.extraClasses} />
                  </div>
                  <div>
                    <Controller
                      name="classPrice"
                      control={control}
                      render={({ field }) => (
                        <CurrencyInput
                        value={field.value ?? null}  
                          onChange={(value) => field.onChange(value)} 
                          placeholder="Precio clase individual"
    />
  )}
/>
<ErrorMessage error={errors.classPrice} />
                  </div>
                </InputsContainer>)}
          </div>    
          <ButtonsContainer>
            <Button type="button" onClick={onBack}>Atrás</Button>
            <Button type="submit">Siguiente</Button>
          </ButtonsContainer>
        </FormContainer> 
      </MainContainer>
    )
  };
export default PaymentData;
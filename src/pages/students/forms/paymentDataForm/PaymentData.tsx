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
import { PaymentPlanName } from "../../../../app/types/models/PaymentPlanName";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { paymentDataScheme } from "./PaymentData.scheme";
import { ErrorMessage} from "../../../../components/error_message/ErrorMessage"
import type { PaymentDataProps } from "../../create-student/CreateStudent";

interface FormProp {
  createStudentCall: (data: PaymentDataProps) => void;
  paymentData:PaymentDataProps | undefined;
  stepBack:()=>void;
}

function PaymentData({
  createStudentCall,
  paymentData,
  stepBack
}: FormProp) {


  type FormData = yup.InferType<typeof paymentDataScheme>;
    
  const studentRegistrationForm = paymentData ||
  {
    paymentPlanName:"",
    classPrice:null,
    extraClasses:null,
    paymentDay:undefined,
  };
  
  const PlanTypeNameArray = Object.values(PaymentPlanName);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(paymentDataScheme) as any,
    defaultValues:{...studentRegistrationForm},
  });

  const PaymentPlanNameSelected = watch("paymentPlanName");

  const onSubmit = (paymentData: FormData) => {
     createStudentCall({
      paymentPlanName: paymentData.paymentPlanName,
      paymentDay: paymentData.paymentDay,
      classPrice:paymentData.classPrice,
      extraClasses:paymentData.extraClasses
    })
  };

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
              {PaymentPlanNameSelected === "Día específico" && (
                <>
                  <Input placeholder="Día de pago"  {...register("paymentDay")}/>
                  <ErrorMessage error={errors.paymentDay} /></>
              )}
              {PaymentPlanNameSelected=== "Principio de mes" && (
                <InputsContainer>
                  <div>
                    <SmallInput placeholder="Clases extras" {...register("extraClasses")}></SmallInput>
                    <ErrorMessage error={errors.extraClasses} />
                  </div>
                  <div>
                    <SmallInput placeholder="Precio clase individual" {...register("classPrice")}></SmallInput>
                    <ErrorMessage error={errors.classPrice} />
                  </div>
                </InputsContainer>)}
          </div>    
          <ButtonsContainer>
            <Button type="button" onClick={stepBack}>Atrás</Button>
            <Button type="submit">Siguiente</Button>
          </ButtonsContainer>
        </FormContainer> 
      </MainContainer>
    )
  };
export default PaymentData;
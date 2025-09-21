import { MainContainer, 
        TitleContainer, 
        FormContainer, 
        Label, 
        Input, 
        Title, 
        Button, 
        ButtonsContainer, 
        Select, 
        Input2, 
        InputsContainer,
        Text} from "./PaymentData.styles";
import { PlanTypeName } from "../../app/types/models/PlanTypeName";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { paymentDataScheme } from "./PaymentData.scheme";
import { ErrorMessage } from "../../components/header/ErrorMessage";
import { useNavigate } from "react-router";
import { setStudentData } from "./StudentRegistrationFormSlice";
import type { RootState } from "../../app/store/store";
import { useDispatch, useSelector } from "react-redux";


function PaymentData() {

  type FormData = yup.InferType<typeof paymentDataScheme>;

  const dispatch = useDispatch();
    
  const studentRegistrationForm = useSelector((state: RootState) => state.studentRegistrationForm);
  
  const PlanTypeNameArray = Object.values(PlanTypeName);

  const {
    register,
    handleSubmit,
    watch,
    getValues, 
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(paymentDataScheme) as any,
    defaultValues:studentRegistrationForm,
  });

  const PlanTypeNameSelected = watch("paymentPlanName");

  const navigate = useNavigate();

  const normalizePaymentData = (data: FormData) => ({
    ...data,
    extraClasses: data.extraClasses ?? undefined,
    classPrice: data.classPrice ?? undefined,
    paymentDay: data.paymentDay ?? undefined,
  });

  const onSubmit = (paymentData: FormData) => {
    const normalizedData = normalizePaymentData(paymentData);
    dispatch(setStudentData(normalizedData)); 
    navigate("/datos-del-plan");
  };

  const stepBack = () => {
    const paymentData = getValues();
    const normalizedData = normalizePaymentData(paymentData);
    dispatch(setStudentData(normalizedData));
    navigate("/datos-personales");
  };

    return(
      <MainContainer>
        <TitleContainer>
          <Title>REGISTRAR NUEVO ALUMNO</Title>
        </TitleContainer>
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
              {PlanTypeNameSelected === "" && (
                <div>
                  <Text>Este campo se habilitará una vez seleccione el plan de pago</Text>
                  <Input disabled={PlanTypeNameSelected===""}></Input>
                </div>)}
              {PlanTypeNameSelected === "Día específico" && (
                <>
                  <Input placeholder="Día de pago"  {...register("paymentDay")}/>
                  <ErrorMessage error={errors.paymentDay} /></>
              )}
              {PlanTypeNameSelected === "Principio de mes" && (
                <InputsContainer>
                  <div>
                    <Input2 placeholder="Clases extras" {...register("extraClasses")}></Input2>
                    <ErrorMessage error={errors.extraClasses} />
                  </div>
                  <div>
                    <Input2 placeholder="Precio clase individual" {...register("classPrice")}></Input2>
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
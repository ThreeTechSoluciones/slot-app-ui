
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
import { classDataScheme } from "./ClassData.scheme";
import { ErrorMessage } from "../../components/header/ErrorMessage";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";


function PaymentData() {

  type FormData = yup.InferType<typeof classDataScheme>;
  
  const location = useLocation();
  
  const studentData = location.state;  //se utiliza para recuperar los datos almacenados del paso anterior
  
  const PlanTypeNameArray = Object.values(PlanTypeName);
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm<FormData>({
      resolver: yupResolver(classDataScheme) as any,
    });

    const PlanTypeNameSelected = watch("paymentType");

    const navigate = useNavigate();

    const onSubmit = (paymentData: FormData) => {
      const data={...studentData,...paymentData, };
      console.log("Datos validados:", data);
      navigate("/datos-del-plan",{ state: { ...data }});
    };
  
    return(
      <MainContainer>
        <TitleContainer>
          <Title>REGISTRAR NUEVO ALUMNO</Title>
        </TitleContainer>
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label>Forma de pago</Label>
            <Select {...register("paymentType")}>Plan de pago*
                <option value="" disabled selected>Seleccione una opción</option>
                {PlanTypeNameArray.map((planType) => (
                  <option key={planType} value={planType}>{planType}</option>
                ))}
            </Select>
            <ErrorMessage error={errors.paymentType} />
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
                    <Input2 placeholder="Precio clase individual" {...register("price")}></Input2>
                    <ErrorMessage error={errors.price} />
                  </div>
                </InputsContainer>)}
          </div>    
          <ButtonsContainer>
            <Button type="button" onClick={()=>navigate("/datos-personales")}>Atrás</Button>
            <Button type="submit">Siguiente</Button>
          </ButtonsContainer>
        </FormContainer> 
      </MainContainer>
    )
  };
export default PaymentData;
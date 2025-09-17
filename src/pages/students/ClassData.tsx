
import { MainContainer, TitleContainer, FormContainer, Label, InputDate, Input, Title , Button, ButtonsContainer, Select, Input2, InputsContainer, TurnosContainer, Container,Icon, Text} from "./Students.styles";
import { PlanTypeName } from "../../app/types/models/PlanTypeName";
import { Plan } from "../../app/types/models/Plan";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { classDataScheme } from "./ClassData.scheme";
import { ErrorMessage } from "../../components/header/ErrorMessage";
import { useNavigate } from "react-router";
import plusIcon from "../../assets/plus-icon.webp"
import { useLocation } from "react-router-dom";
import { useCreateStudentMutation } from "../../app/services/StudentService";
import useAuthentication from "../../hooks/useAuthentication";

type FormData = yup.InferType<typeof classDataScheme>;


function ClassData() {

 

   
      const location = useLocation();
      const personalData = location.state; 
    

    const PlanTypeNameArray = Object.values(PlanTypeName);


    const {
    register,
    handleSubmit,
    watch,
    resetField,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(classDataScheme) as any,
    defaultValues: {
      admissionDate: new Date(),
    },
  });

  const PlanTypeNameSelected = watch("paymentType");

  const [createStudent]=useCreateStudentMutation();

  const navigate = useNavigate();

  const { userId } = useAuthentication();

  

  const onSubmit = async(data: FormData) => {
    const classData={...personalData,...data, userId:userId};
    try{
      console.log("Datos validados:", classData);
    } catch (error) {
      console.error("Error al crear el alumno:", error);
      console.log(classData)
    }
    
    
  };
  

    return(
        <MainContainer>
          <TitleContainer>
            <Title>REGISTRAR NUEVO ALUMNO</Title>
          </TitleContainer>
          <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label>Forma de pago*</Label>
              <Select {...register("paymentType")}>Forma de pago*
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
                  <><Input placeholder="Día de pago"  {...register("paymentDay")}/>
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
export default ClassData;
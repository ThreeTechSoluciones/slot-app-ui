
import { MainContainer, TitleContainer, FormContainer, Label, InputDate, Input, Title , Button, ButtonsContainer, Select, Input2, InputsContainer, TurnosContainer, Container,Icon} from "./Students.styles";
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

    const PlanArray = Object.values(Plan);

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

  const PlanSelected = watch("planType");

  const [createStudent]=useCreateStudentMutation();

  const navigate = useNavigate();

  const { userId } = useAuthentication();

  

  const onSubmit = async(data: FormData) => {
    const finalData={...personalData,...data, userId:userId};
    try{
      await createStudent(finalData).unwrap();
      console.log("Datos validados:", finalData);
    navigate("/home");
    } catch (error) {
      console.error("Error al crear el alumno:", error);
      console.log(finalData)
    }
    
    
  };
  

    return(
        <MainContainer>
          <TitleContainer>
            <Title>REGISTRAR NUEVO ALUMNO</Title>
          </TitleContainer>
          <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label>Fecha de ingreso*</Label> 
              <InputDate type="date" {...register("admissionDate")}></InputDate>
              <ErrorMessage error={errors.admissionDate} />
            </div>
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
                  <Input disabled={PlanTypeNameSelected===""}></Input>)}
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
              <div>
                <Label>Plan</Label>
                  <Select {...register("planType")}>
                    <option value="" disabled selected>Seleccione una opción</option>
                    {PlanArray.map((plan)=>(
                      <option key={plan} value={plan}>{plan}</option>
                    ))}
                  </Select>
                   <ErrorMessage error={errors.planType} />
              </div>
              <div>
                <Label>Turnos*</Label>
                <TurnosContainer>
                  <Container>
                  <Input placeholder="Asignar turnos" readOnly disabled={PlanSelected===""}></Input>
                  {/*PlanSelected!="" && (
                    <ErrorMessage  error={errors.classes} />
                  )*/}
                  </Container>
                  <Icon src={plusIcon} ></Icon>
                </TurnosContainer> 
              </div>        
              <ButtonsContainer>
                <Button type="button" onClick={()=>navigate("/datos-personales")}>Atrás</Button>
                <Button type="submit">Registrar</Button>
              </ButtonsContainer>
          </FormContainer> 
        </MainContainer>
      )
    };
export default ClassData;
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../../components/header/ErrorMessage";
import { planDataScheme } from "./PlanData.scheme";
import { MainContainer,
        Label, 
        Select, 
        Title, 
        TitleContainer, 
        FormContainer, 
        Button, 
        ButtonsContainer} 
        from "./PlanData.styles";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Calender from "../../components/calender/calender";
import { useNavigate } from "react-router";
import ShiftDetail from "../../components/shiftsDetail/ShiftDetail";
import { useShiftHandler } from "../../components/calender/ShiftHandler";
import useAuthentication from "../../hooks/useAuthentication";
import { useGetUserPlansQuery } from "../../app/services/UserService";
import { useCreateStudentMutation } from "../../app/services/StudentService";
import { useDispatch,useSelector } from "react-redux";
import type { RootState } from "../../app/store/store";
import { setStudentData } from "./StudentRegistrationFormSlice";
import toast from "react-hot-toast";



function PlanData() {

    type FormData = yup.InferType<typeof planDataScheme>;
   
    const navigate=useNavigate();

    const [createStudent] = useCreateStudentMutation();
    
    const {shifts, newShift, removeShift}=useShiftHandler();
    
    const {
        register,
        getValues,
        handleSubmit,
        formState: { errors },
      } = useForm<FormData>({
        resolver: yupResolver(planDataScheme),
      });

      const { userId } = useAuthentication();
    
      const { data: planTypes } = useGetUserPlansQuery(userId!);

      const studentDataFromSlice = useSelector(
  (state: RootState) => state.studentRegistrationForm
);

const dispatch = useDispatch();

const onSubmit = async (planData: FormData) => {
  console.log("hola")
  if (!userId) {
  throw new Error("No se encontró un userId válido");
}

  const createStudentRequest = {
    ...studentDataFromSlice,
    ...planData,
    userId,
    admissionDate: new Date(),
     pathologies: studentDataFromSlice.pathologies ?? null,
     extraClasses: studentDataFromSlice.extraClasses ?? undefined,
      classPrice: studentDataFromSlice.classPrice ?? undefined,
      paymentDay: studentDataFromSlice.paymentDay ?? undefined,
  };
  dispatch(setStudentData(createStudentRequest));
  console.log(createStudentRequest)

  

  try {
    await createStudent(createStudentRequest);
    console.log("Estudiante creado");
    toast.success("Estudiante creado con éxito")
    navigate("/home")
  } catch (error) {
    console.error("Error al crear el estudiante", error);
  }
};



    
    return(
        <MainContainer>
            <TitleContainer> 
                <Title>REGISTRAR NUEVO ALUMNO</Title>
            </TitleContainer>
            <FormContainer onSubmit={handleSubmit(onSubmit)}>
                <Label>Plan</Label>
                  <Select {...register("planId")}>
                    <option value="" disabled selected>Seleccione una opción</option>
                    {planTypes?.map((plan)=>(
                      <option key={plan.id} value={plan.id}>{plan.name}</option>
                    ))}
                  </Select>
                   <ErrorMessage error={errors.planId} />
                   <Calender  selectedShifts={shifts}  onSeleccionTurno={newShift} onDeleteShift={removeShift}  />
                   <ShiftDetail shifts ={shifts}/>
              <ButtonsContainer>
                <Button onClick={() => navigate("/datos-del-turno")}>Atrás</Button>
                <Button type="submit">Registrar</Button>
              </ButtonsContainer>
              </FormContainer>
              
        </MainContainer>    
         
    )
}
export default PlanData;


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

  const { userId } = useAuthentication();

  const [createStudent] = useCreateStudentMutation();

  const { data: planTypes } = useGetUserPlansQuery(userId!);
    
  const {shifts, newShift, removeShift}=useShiftHandler();

  const studentDataFromSlice = useSelector(
      (state: RootState) => state.studentRegistrationForm
  );

  const studentRegistrationForm = useSelector((state: RootState) => state.studentRegistrationForm);
  
  const dispatch = useDispatch();
    
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(planDataScheme),
    defaultValues: studentRegistrationForm,
  });
  
  const onSubmit = async (planData: FormData) => {
    
    if (!userId) {
      throw new Error("No se encontró un userId válido");
    }

    const createStudentRequest = {
      ...studentDataFromSlice,
      ...planData,
      admissionDate: new Date(),
      userId,
      pathologies: studentDataFromSlice.pathologies ?? null,
      extraClasses: studentDataFromSlice.extraClasses ?? undefined,
      classPrice: studentDataFromSlice.classPrice ?? undefined,
      paymentDay: studentDataFromSlice.paymentDay ?? undefined,
      birthday: new Date(studentDataFromSlice.birthday),
    };
      
      try {
        await createStudent(createStudentRequest).unwrap();;
        navigate("/home")
        toast.success("El estudiante ha sido registrado") 
      } catch (error) {
      toast.error("Ha ocurrido un error en la creación del estudiante");
      }
    };

    const stepBack = () => {
        const planData = getValues();
        dispatch(setStudentData(planData));
        navigate("/datos-del-plan");
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
          <Button type="button" onClick={stepBack}>Atrás</Button>
          <Button type="submit">Registrar</Button>
        </ButtonsContainer>
      </FormContainer>
    </MainContainer>        
  )
}
export default PlanData;


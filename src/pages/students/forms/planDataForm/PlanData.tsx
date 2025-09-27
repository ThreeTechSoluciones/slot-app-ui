import { useForm } from "react-hook-form";
import { ErrorMessage} from "../../../../components/error_message/ErrorMessage";
import { planDataScheme } from "./PlanData.scheme";
import { shiftRegistrationCalendarData } from "../../../../components/shiftRegistrationCalendar/ShiftRegistrationCalendarData";
import { MainContainer,
        Label, 
        Select, 
        FormContainer, 
        Button, 
        ButtonsContainer} 
        from "./PlanData.styles";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ShiftRegistrationCalendar from "../../../../components/shiftRegistrationCalendar/ShiftRegistrationCalendar";
import ShiftDetail from "../../../../components/shiftsDetail/ShiftDetail";
import { useShiftHandler } from "../../../../components/shiftRegistrationCalendar/UseShiftHandler";
import useAuthentication from "../../../../hooks/useAuthentication";
import { useGetUserPlansQuery } from "../../../../app/services/UserService";
import type { PlanDataProps } from "../../create-student/CreateStudent";

interface FormProp {
  createStudentCall: (data: PlanDataProps) => void;
    planData: PlanDataProps | undefined;
    stepBack:()=>void;
}
function PlanData({
  createStudentCall,
  planData,
  stepBack
}: FormProp) {

  type FormData = yup.InferType<typeof planDataScheme>;
  
  const { userId } = useAuthentication();

  const { data: planTypes } = useGetUserPlansQuery(userId!);
    
  const { shifts, removeShift, newShift} = useShiftHandler()

  const studentRegistrationForm = planData || {
    planId:"",
  };
    
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(planDataScheme),
    defaultValues: studentRegistrationForm,
  });
  
  const onSubmit = async (planData: FormData) => {
   
    createStudentCall(planData)
      
  }
    
  return(
    <MainContainer>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <Label>Plan</Label>
        <Select {...register("planId")}>
          <option value="" disabled selected>Seleccione una opción</option>
          {planTypes?.map((plan)=>(
            <option key={plan.id} value={plan.id}>{plan.name}</option>
          ))}
        </Select>
        <ErrorMessage error={errors.planId} />
        <ShiftRegistrationCalendar  listShifts={shiftRegistrationCalendarData} selectedShifts={shifts}   onSelectShift ={newShift} onDeleteShift={removeShift}  />
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


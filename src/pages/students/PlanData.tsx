import { useForm } from "react-hook-form";
import { Plan } from "../../app/types/models/Plan";
import { ErrorMessage } from "../../components/header/ErrorMessage";
import { planDataScheme } from "./PlanData.scheme";
import { MainContainer, Label, Select, Title, TitleContainer, SecondaryContainer, Button, ButtonsContainer} from "./PlanData.styles";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Calender from "../../components/calender/calender";
import { useNavigate } from "react-router";
import ShiftDetail from "../../components/shiftsDetail/ShiftDetail";
import { useShiftHandler } from "../../components/calender/ShiftHandler";



function PlanData() {

    type FormData = yup.InferType<typeof planDataScheme>;
    const PlanArray = Object.values(Plan);
    const navigate=useNavigate();
    
    const {shifts, newShift, removeShift}=useShiftHandler();
    const {
        register,
        formState: { errors },
      } = useForm<FormData>({
        resolver: yupResolver(planDataScheme),
      });
    
    return(
        <MainContainer>
            <TitleContainer> 
                <Title>REGISTRAR NUEVO ALUMNO</Title>
            </TitleContainer>
            <SecondaryContainer>
                <Label>Plan</Label>
                  <Select {...register("planType")}>
                    <option value="" disabled selected>Seleccione una opción</option>
                    {PlanArray.map((plan)=>(
                      <option key={plan} value={plan}>{plan}</option>
                    ))}
                  </Select>
                   <ErrorMessage error={errors.planType} />
                   <Calender  selectedShifts={shifts}  onSeleccionTurno={newShift} onEliminarTurno={removeShift}  />
                   <ShiftDetail shifts ={shifts}/>
              </SecondaryContainer>
              <ButtonsContainer>
                <Button onClick={() => navigate("/datos-del-turno")}>Atrás</Button>
                <Button>Registrar</Button>
              </ButtonsContainer>
        </MainContainer>    
         
    )
}

export default PlanData;



/*  */
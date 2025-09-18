import { useForm } from "react-hook-form";
import { Plan } from "../../app/types/models/Plan";
import { ErrorMessage } from "../../components/header/ErrorMessage";
import { planDataScheme } from "./PlanData.scheme";
import { MainContainer, Label, Select, Title, TitleContainer, SecondaryContainer} from "./PlanData.styles";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Calender from "../../components/calender/calender";



function PlanData() {

    type FormData = yup.InferType<typeof planDataScheme>;
    const PlanArray = Object.values(Plan);


    const {
        register,
        handleSubmit,
        watch,
        resetField,
        control,
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
              </SecondaryContainer>
              <Calender />
        </MainContainer>    
         
    )
}

export default PlanData;



/*  */
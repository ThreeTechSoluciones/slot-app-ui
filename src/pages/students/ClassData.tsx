
import { MainContainer, TitleContainer, FormContainer, Label, InputDate, Input, Title , Button, ButtonsContainer, Select} from "./PersonalData.styles";
import { PlanTypeName } from "../../app/types/models/PlanTypeName";
import { Plan } from "../../app/types/models/Plan";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { classDataScheme } from "./ClassData.scheme";

type FormData = yup.InferType<typeof classDataScheme>;

function ClassData() {

    


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
    resolver: yupResolver(classDataScheme),
  });

  const PlanTypeNameSelected = watch("paymentType");

  const PlanSelected = watch("plan");

    return(
        <MainContainer>
                    <TitleContainer>
                        <Title>REGISTRAR NUEVO ALUMNO</Title>
                    </TitleContainer>
                        <FormContainer>
                          <div>
                            <Label>Fecha de ingreso*</Label> 
                            <InputDate type="date" {...register("admissionDate")}></InputDate>
                        </div>
                        <div>
                            <Label>Forma de pago*</Label>
                            <Select {...register("paymentType")}>Forma de pago*
                            <option value="" disabled selected>Seleccione una opción</option>
                            {PlanTypeNameArray.map((planType) => (
                                <option key={planType} value={planType}>{planType}</option>
                            ))}
                          </Select>
                        </div>
                        <div>
                          <Label>Datos del pago</Label>
                          <Input placeholder="Día de pago" disabled={PlanTypeNameSelected!="Día específico"} ></Input>
                        </div>
                        <div>
                          <Label>Plan</Label>
                          <Select {...register("plan")}>
                            <option value="" disabled selected>Seleccione una opción</option>
                            {PlanArray.map((plan)=>(
                                <option key={plan} value={plan}>{plan}</option>
                            ))}
                          </Select>
                        </div>
                        <div>
                          <Label>Turnos*</Label>
                          <Input placeholder="Asignar turnos" disabled={PlanSelected===""} ></Input>
                        </div>
                        
                        <ButtonsContainer>
                            <Button type="button">Cancelar</Button>
                            <Button type="submit">Siguiente</Button>
                        </ButtonsContainer>
                         
        
                    </FormContainer> 
                </MainContainer>
            )
        };
export default ClassData;
import { yupResolver } from "@hookform/resolvers/yup";
import { MainContainer, FormContainer, Input, Description, InputDate, Button, Title, ButtonsContainer, TitleContainer} from "./PersonalData.styles";
import { studentsScheme } from "./students.scheme";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { ErrorMessage } from "../../components/header/ErrorMessage";


function PersonalData() {
type FormData = yup.InferType<typeof studentsScheme>;

      const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(studentsScheme),
  });
const onSubmit = (data: FormData) => {
    console.log("Datos validados:", data);
  };
  
    return (
        <MainContainer>
            <TitleContainer>
                <Title>REGISTRAR NUEVO ALUMNO</Title>
            </TitleContainer>
                <FormContainer onSubmit={handleSubmit(onSubmit)}>
                <Input placeholder="Nombre" {...register("name")}></Input>
                <ErrorMessage error={errors.name} />
                <Input placeholder="Apellido" {...register("lastname")}></Input>
                <ErrorMessage error={errors.lastname} />
                <Input placeholder="DNI" {...register("dni")} ></Input>
                <ErrorMessage error={errors.dni} />
                <InputDate placeholder="Fecha de nacimiento" type="date" {...register("birthday")}></InputDate>
                <ErrorMessage error={errors.birthday} />
                <Input placeholder="Número de teléfono" {...register("phoneNumber")}></Input>
                <ErrorMessage error={errors.phoneNumber} />
                <Description placeholder="Patologías/enfermedades" {...register("pathologies")}></Description>
                 <ErrorMessage error={errors.pathologies} />
                <ButtonsContainer>
                    <Button>Cancelar</Button>
                    <Button type="submit">Siguiente</Button>
                </ButtonsContainer>
            </FormContainer> 
        </MainContainer>
    )
};

export default PersonalData;
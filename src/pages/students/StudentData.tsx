import { yupResolver } from "@hookform/resolvers/yup";
import { MainContainer, 
        FormContainer, 
        Input, 
        Description, 
        InputDate, 
        Button, 
        Title, 
        ButtonsContainer, 
        TitleContainer, 
        Label} 
        from "./Students.styles";
import { StudentDataScheme } from "./StudentData.scheme";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { ErrorMessage } from "../../components/header/ErrorMessage";
import { useNavigate } from "react-router";

function StudentData() {

  type FormData = yup.InferType<typeof StudentDataScheme>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(StudentDataScheme),
    defaultValues: {
      name:"",
      lastName:"",
      dni:"",
      birthday: new Date(),
      cellphoneNumber:"",
      pathologies:"", 
  },
  });

  const navigate = useNavigate();
  
  const onSubmit = (studentData: FormData) => {
    navigate("/datos-del-turno" ,{ state: { ...studentData }});
  };
  
  return (
    <MainContainer>
      <TitleContainer>
        <Title>REGISTRAR NUEVO ALUMNO</Title>
      </TitleContainer>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label>Nombre*</Label> 
          <Input placeholder="Nombre" {...register("name")}></Input>
          <ErrorMessage error={errors.name} />
        </div>
        <div>
          <Label>Apellido*</Label>
          <Input placeholder="Apellido" {...register("lastName")}></Input>
          <ErrorMessage error={errors.lastName} />
        </div>
        <div>
          <Label>DNI*</Label>
          <Input placeholder="DNI (ingresar solo números, sin puntos ni espacios)" {...register("dni")} ></Input>
          <ErrorMessage error={errors.dni} />
        </div>
        <div>
          <Label>Fecha de nacimiento*</Label>
          <InputDate placeholder="Fecha de nacimiento" type="date" {...register("birthday")}></InputDate>
          <ErrorMessage error={errors.birthday} />
        </div>
        <div>
          <Label>Número de teléfono*</Label>
          <Input placeholder="Número de teléfono" {...register("cellphoneNumber")}></Input>
          <ErrorMessage error={errors.cellphoneNumber} />
        </div>
        <div>
          <Label>Patologías o enfermedades</Label>
          <Description placeholder="Patologías/enfermedades" {...register("pathologies")}></Description>
          <ErrorMessage error={errors.pathologies} />
        </div>
        <ButtonsContainer>
          <Button type="button" onClick={() => navigate("/nuevo-alumno")}>Cancelar</Button>
          <Button type="submit">Siguiente</Button>
        </ButtonsContainer>
      </FormContainer> 
    </MainContainer>
  )
};

export default StudentData;
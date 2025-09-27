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
        from "../styles/StudentData.styles";
import { StudentDataScheme } from "../schemes/StudentData.scheme";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { ErrorMessage} from "../../../components/error_message/ErrorMessage";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { resetStudentData, setStudentData } from "../StudentRegistrationFormSlice";
import type { RootState } from "../../../app/store/store";


function StudentData() {

  const dispatch = useDispatch();
  
  const studentRegistrationForm = useSelector((state: RootState) => state.studentRegistrationForm);

  type FormData = yup.InferType<typeof StudentDataScheme>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(StudentDataScheme),
    defaultValues: {
    ...studentRegistrationForm, 
    birthday: studentRegistrationForm.birthday
      ? new Date(studentRegistrationForm.birthday).toISOString().split('T')[0]
      : "", 
  }
  });

  const navigate = useNavigate();
  
  const onSubmit = (studentData: FormData) => {
    const normalizedStudentData = {
      ...studentData,
      pathologies: studentData.pathologies ?? undefined,
       birthday: studentData.birthday
      ? new Date(studentData.birthday).toISOString()
      : undefined,
    };
    dispatch(setStudentData(normalizedStudentData)),
    navigate("/nuevo-alumno/datos-del-pago");
  };
  
  return (
    <MainContainer>
      <TitleContainer>
        <Title>REGISTRAR NUEVO ALUMNO</Title>
      </TitleContainer>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label>Nombre*</Label> 
          <Input placeholder="Juan" {...register("name")}></Input>
          <ErrorMessage error={errors.name} />
        </div>
        <div>
          <Label>Apellido*</Label>
          <Input placeholder="Gomez" {...register("lastName")}></Input>
          <ErrorMessage error={errors.lastName} />
        </div>
        <div>
          <Label>DNI*</Label>
          <Input placeholder="56987256 (ingresar solo números, sin puntos ni espacios)" {...register("dni")} ></Input>
          <ErrorMessage error={errors.dni} />
        </div>
        <div>
          <Label>Fecha de nacimiento*</Label>
          <InputDate type="date" {...register("birthday")}></InputDate>
          <ErrorMessage error={errors.birthday} />
        </div>
        <div>
          <Label>Número de teléfono*</Label>
          <Input placeholder="3534698523" {...register("cellphoneNumber")}></Input>
          <ErrorMessage error={errors.cellphoneNumber} />
        </div>
        <div>
          <Label>Patologías o enfermedades</Label>
          <Description placeholder="Hernia de disco" {...register("pathologies")}></Description>
          <ErrorMessage error={errors.pathologies} />
        </div>
        <ButtonsContainer>
          <Button type="button" onClick={() =>{navigate("/nuevo-alumno"); dispatch(resetStudentData())}}>Cancelar</Button>
          <Button type="submit">Siguiente</Button>
        </ButtonsContainer>
      </FormContainer> 
    </MainContainer>
  )
};

export default StudentData;
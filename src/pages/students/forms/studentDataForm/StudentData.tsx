import { yupResolver } from "@hookform/resolvers/yup";
import { MainContainer, 
        FormContainer, 
        Input, 
        Description, 
        InputDate, 
        Button, 
        ButtonsContainer, 
        Label} 
        from "./StudentData.styles";
import { StudentDataScheme } from "./StudentData.scheme";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { ErrorMessage} from "../../../../components/error_message/ErrorMessage";
import { useNavigate } from "react-router";
import type { StudentDataProps } from "../../create-student/CreateStudent";

interface FormProp {
  createStudentCall: (data: StudentDataProps) => void;
  studentData: StudentDataProps | undefined;
}

function StudentData({
  createStudentCall,
  studentData
}: FormProp) {

  
  const studentRegistrationForm = studentData || {
    name:"",
    lastName:"",
    dni:"",
    cellphoneNumber:"",
    birthday:"",
    pathologies:"",
    paymentPlanName:"",
    planId:"",
  };

  type FormData = yup.InferType<typeof StudentDataScheme>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(StudentDataScheme),
    defaultValues: {
    ...studentRegistrationForm, 
  }
  });

  const navigate = useNavigate();
  
  const onSubmit = (studentData: FormData) => {
    createStudentCall({
      name: studentData.name,
      lastName: studentData.lastName,
      dni: studentData.dni,
      cellphoneNumber: studentData.cellphoneNumber,
      birthday: studentData.birthday,
      pathologies: studentData.pathologies
    })

  };
  
  return (
    <MainContainer>
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
          <Button type="button" onClick={() =>{navigate("/nuevo-alumno");}}>Cancelar</Button>
          <Button type="submit">Siguiente</Button>
        </ButtonsContainer>
      </FormContainer> 
    </MainContainer>
  )
};

export default StudentData;
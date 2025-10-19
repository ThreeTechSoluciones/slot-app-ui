import {
  InformationContainer,
  Label,
  MainContainer,
  StudentNameContainer,
  HeaderBoxes,
  StudentStatusStyle,
  IconStyles,
  AllInformationContainer,
  PaymentInfoContainer,
  NotFoundStudentMessage,
  InfoBoxesContainer,
  StudentInfo,
  EditIconStyles,
  StudentSituationStyle,
  StudentInfoContainer,
  ButtonContainer,
  SubTitle,
  Title,
} from "./StudentDetail.styles";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { useGetStudentByIdQuery } from "../../app/services/StudentService";
import StudentIcon from "../../assets/student-icon.svg";
import BackIcon from "../../assets/back-icon.svg";
import InfoIcon from "../../assets/info-icon.svg";
import EditIcon from "../../assets/edit-icon.svg";
import Button from "../../components/button/Button";
import { EditarAlumno, MisPlanes } from "../../routes/RoutesUtils";

const StudentDetail = () => {
  const { studentId } = useLocation().state;
  const { data: student, isError } = useGetStudentByIdQuery(studentId);
  const navigate = useNavigate();
  if (isError || !student)
    return (
      <div>
        <NotFoundStudentMessage>
          Ocurrió un error al buscar la información del alumno. <br />
          Intente nuevamente
        </NotFoundStudentMessage>
      </div>
    );

  return (
    <MainContainer>
      <Title>
        <img
          src={BackIcon}
          alt="back-icon"
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer" }}
        ></img>
        DETALLE DEL ALUMNO
      </Title>
      <StudentNameContainer>
        <Title center>
          <IconStyles>
            <img src={StudentIcon} alt="student-icon"></img>
          </IconStyles>
          {student.name} {student.lastName}
        </Title>
      </StudentNameContainer>

      <InfoBoxesContainer>
        <StudentInfoContainer>
          <HeaderBoxes>
            <SubTitle>
              <IconStyles>
                <img
                  src={StudentIcon}
                  alt="student-icon"
                  width={24}
                  height={24}
                ></img>
              </IconStyles>
              Datos del alumno
            </SubTitle>
            <EditIconStyles>
              <img
                src={EditIcon}
                alt="edit-icon"
                onClick={() => navigate(EditarAlumno)}
              ></img>
            </EditIconStyles>
          </HeaderBoxes>
          <AllInformationContainer>
            <InformationContainer>
              <Label>Nombre</Label>
              <StudentInfo>{student.name}</StudentInfo>
            </InformationContainer>
            <InformationContainer>
              <Label>Apellido</Label>
              <StudentInfo>{student.lastName}</StudentInfo>
            </InformationContainer>
            <InformationContainer>
              <Label>DNI</Label>
              <StudentInfo>{student.dni}</StudentInfo>
            </InformationContainer>
            <InformationContainer>
              <Label>Fecha de ingreso</Label>
              <StudentInfo>{student.admissionDate}</StudentInfo>
            </InformationContainer>
            <InformationContainer>
              <Label>Fecha de nacimiento</Label>
              <StudentInfo>{student.birthday}</StudentInfo>
            </InformationContainer>
            <InformationContainer>
              <Label>Edad</Label>
              <StudentInfo>{student.age}</StudentInfo>
            </InformationContainer>
            <InformationContainer>
              <Label>Numero de teléfono</Label>
              <StudentInfo>{student.cellphoneNumber}</StudentInfo>
            </InformationContainer>
            <InformationContainer>
              <Label>Patologías</Label>
              <StudentInfo>{student.pathologies}</StudentInfo>
            </InformationContainer>
          </AllInformationContainer>
        </StudentInfoContainer>
        <PaymentInfoContainer>
          <HeaderBoxes>
            <SubTitle>
              <IconStyles>
                <img src={InfoIcon} alt="info-icon"></img>
              </IconStyles>
              Datos de pago y estados
            </SubTitle>
            <EditIconStyles>
              <img src={EditIcon} alt="edit-icon"></img>
            </EditIconStyles>
          </HeaderBoxes>
          <AllInformationContainer>
            <InformationContainer>
              <Label>Forma de pago</Label>
              <StudentInfo>{student.paymentPlan}</StudentInfo>
            </InformationContainer>
            <InformationContainer>
              <Label>Estado del alumno</Label>
              <StudentStatusStyle status={student.status}>
                {student.status ? "Activo" : "Inactivo"}
              </StudentStatusStyle>
            </InformationContainer>
            <InformationContainer>
              <Label>Día de pago</Label>
              <StudentInfo>
                {student.paymentDay ||
                  student.paymentPlan == "Principio de mes"}
              </StudentInfo>
            </InformationContainer>

            <InformationContainer>
              <Label>Situación del alumno</Label>
              <StudentSituationStyle situation={student.situation}>
                {student.situation}
              </StudentSituationStyle>
            </InformationContainer>
            <ButtonContainer>
              <Button
                variant="primary"
                size="large"
                onClick={() => navigate(MisPlanes)}
              >
                Ver cuotas
              </Button>
            </ButtonContainer>
          </AllInformationContainer>
        </PaymentInfoContainer>
      </InfoBoxesContainer>
    </MainContainer>
  );
};

export default StudentDetail;

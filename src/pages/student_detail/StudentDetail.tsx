import {
  InformationContainer,
  Label,
  MainContainer,
  StudentNameContainer,
  HeaderBoxes,
  StudentStatusStyle,
  IconStyles,
  ButtonWrapper,
  AllInformationContainer,
  PaymentInfoContainer,
  NotFoundStudentMessage,
  InfoBoxesContainer,
  StudentInfo,
  EditIconStyles,
  HeaderContainer,
  StudentSituationStyle,
  StudentInfoContainer,
  ButtonContainer,
  SubTitle,
  Title,
} from "./StudentDetail.styles";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import {
  useActivateStudentMutation,
  useDeleteStudentMutation,
  useGetStudentByIdQuery,
} from "../../app/services/StudentService";
import StudentIcon from "../../assets/student-icon.svg";
import BackIcon from "../../assets/back-icon.svg";
import InfoIcon from "../../assets/info-icon.svg";
import EditIcon from "../../assets/edit-icon.svg";
import DesactivateIcon from "../../assets/desactivate-icon.svg";
import Button from "../../components/button/Button";
import { ConfirmDialog } from "../../components/confirm_dialog/ConfirmDialog";
import { EditarAlumno, MisPlanes } from "../../routes/RoutesUtils";
import toast from "react-hot-toast";
import { useState } from "react";

const StudentDetail = () => {
  const { studentId } = useLocation().state;
  const { data: student, isError } = useGetStudentByIdQuery(studentId);
  const [activateStudent] = useActivateStudentMutation(studentId);
  const [desactivateStudent] = useDeleteStudentMutation(studentId);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleOpenConfirm = () => {
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    try {
      await desactivateStudent(studentId).unwrap();
      toast.success("Alumno dado de baja con éxito");
      setShowConfirm(false);
    } catch (error) {
      toast.error("Hubo un problema al dar de baja al alumno");
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };
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
      <HeaderContainer>
        <Title>
          <img
            src={BackIcon}
            alt="back-icon"
            onClick={() => navigate(-1)}
            style={{ cursor: "pointer" }}
          ></img>
          DETALLE DEL ALUMNO
        </Title>
        <ButtonWrapper>
          <Button
            size="medium"
            variant="warning"
            icon={<img src={DesactivateIcon} alt="desactivate-icon"></img>}
            onClick={handleOpenConfirm}
          >
            Dar de baja
          </Button>
          {showConfirm && (
            <ConfirmDialog
              message={`¿Estás seguro de dar de baja a ${student.name} ${student.lastName}?`}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
            />
          )}
        </ButtonWrapper>
      </HeaderContainer>

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

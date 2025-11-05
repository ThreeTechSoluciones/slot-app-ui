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
import { useNavigate } from "react-router-dom";
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
import { MisPlanes } from "../../routes/RoutesUtils";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import type { StudentDetailResponse } from "../../app/types/responses/StudentDetailResponse.type";

const StudentDetail = () => {
  const { studentId } = useLocation().state;
  const { data: student, isError } = useGetStudentByIdQuery(studentId);
  const [activateStudent] = useActivateStudentMutation();
  const [desactivateStudent] = useDeleteStudentMutation();
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(student?.status ?? false);
  useEffect(() => {
    setIsActive(student?.status ?? false);
  }, [student]);
  const handleOpenConfirm = () => {
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    try {
      if (isActive) {
        await desactivateStudent(studentId).unwrap();
        toast.success("El alumno ha sido dado de baja.");
      } else {
        await activateStudent(studentId).unwrap();
        toast.success("El alumno ha sido dado de alta.");
      }
      setIsActive(!isActive);
      setShowConfirm(false);
    } catch (error) {
      toast.error("Hubo un problema al actualizar el alumno");
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
            variant={isActive ? "warning" : "success"}
            icon={
              isActive ? (
                <img src={DesactivateIcon} alt="desactivate-icon" />
              ) : (
                <img
                  src={DesactivateIcon}
                  alt="activate-icon"
                  style={{ transform: "rotate(180deg)" }}
                />
              )
            }
            onClick={handleOpenConfirm}
          >
            {isActive ? "Dar de baja" : "Dar de alta"}
          </Button>
          {showConfirm && (
            <ConfirmDialog
              message={`¿Estás seguro de ${isActive ? "dar de baja" : "dar de alta"
                } a ${student.name} ${student.lastName}?`}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
            />
          )}
        </ButtonWrapper>
      </HeaderContainer>

      <StudentNameContainer>
        <Title>
          <IconStyles>
            <img src={StudentIcon} alt="student-icon"></img>
          </IconStyles>
          {student.name} {student.lastName}
        </Title>
      </StudentNameContainer>
      <InfoBoxesContainer>
        <StudentData student={student} navigate={navigate} />
        <PaymentData
          student={student}
          navigate={navigate}
          isActive={isActive}
        />
      </InfoBoxesContainer>
    </MainContainer>
  );
};

export default StudentDetail;
const StudentData = ({
  student,
  navigate,
}: {
  student: StudentDetailResponse;
  navigate: (path: string, options?: { state?: any }) => void;

}) => {
  const { studentId } = useLocation().state;
  return (
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
            onClick={() => navigate(`/editar-estudiante/1`, { state: { studentId: student.id }, })}
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
  );
};
const PaymentData = ({
  student,
  navigate,
  isActive,
}: {
  student: StudentDetailResponse;
  navigate: (path: string, options?: { state?: any }) => void;
  isActive: boolean;
}) => {
  const { studentId } = useLocation().state;

  return (
    <PaymentInfoContainer>
      <HeaderBoxes>
        <SubTitle>
          <IconStyles>
            <img src={InfoIcon} alt="info-icon"></img>
          </IconStyles>
          Datos de pago y estados
        </SubTitle>
        <EditIconStyles onClick={() => navigate(`/editar-estudiante/2`, { state: { studentId: student.id }, })}>
          <img src={EditIcon} alt="edit-icon"></img>
        </EditIconStyles>
      </HeaderBoxes>
      <AllInformationContainer>
        <InformationContainer>
          <Label>Forma de pago</Label>
          <StudentInfo>{student.paymentPlanName}</StudentInfo>
        </InformationContainer>
        <InformationContainer>
          <Label>Estado del alumno</Label>
          <StudentStatusStyle $status={isActive}>
            {isActive ? "Activo" : "Inactivo"}
          </StudentStatusStyle>
        </InformationContainer>
        <InformationContainer>
          <Label>Día de pago</Label>
          <StudentInfo>
            {student.paymentDay || student.paymentPlanName == "Principio de mes"}
          </StudentInfo>
        </InformationContainer>
        <InformationContainer>
          <Label>Situación del alumno</Label>
          <StudentSituationStyle $situation={student.situation}>
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
  );
};

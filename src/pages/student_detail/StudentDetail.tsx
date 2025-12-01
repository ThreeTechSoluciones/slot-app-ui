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
  TitleContainer,
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
import { EditarAlumno, MisPlanes } from "../../routes/RoutesUtils";
import toast from "react-hot-toast";
import { useState } from "react";
import type { StudentDetailResponse } from "../../app/types/responses/StudentDetailResponse.type";

const StudentDetail = () => {
  const { studentId } = useLocation().state;
  const {
    data: student,
    isError,
    isLoading,
  } = useGetStudentByIdQuery(studentId);
  const [activateStudent] = useActivateStudentMutation();
  const [desactivateStudent] = useDeleteStudentMutation();
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleOpenConfirm = () => {
    setShowConfirm(true);
  };
  const deactivateStudentAndShowMessage = (studentId: string) => {
    desactivateStudent(studentId)
      .unwrap()
      .then(() => {
        toast.success("El alumno ha sido dado de baja.");
      })
      .finally(() => {
        setShowConfirm(false);
      });
  };
  const activateStudentAndShowMessage = (studentId: string) => {
    activateStudent(studentId)
      .unwrap()
      .then(() => {
        toast.success("El alumno ha sido dado de alta.");
      })
      .finally(() => {
        setShowConfirm(false);
      });
  };
  const handleConfirm = () => {
    student?.status
      ? deactivateStudentAndShowMessage(studentId)
      : activateStudentAndShowMessage(studentId);
  };

  if (isLoading) return <div>Cargando...</div>;
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
      {showConfirm && (
        <ConfirmDialog
          message={`¿Estás seguro de ${student.status ? "dar de baja" : "dar de alta"
            } a ${student.name} ${student.lastName}?`}
          onConfirm={handleConfirm}
          onCancel={() => setShowConfirm(false)}
        />
      )}
      <HeaderContainer>
        <TitleContainer>
          <img
            src={BackIcon}
            alt="back-icon"
            onClick={() => navigate(-1)}
            style={{ cursor: "pointer" }}
          />

          <Title>DETALLE DEL ALUMNO</Title>
        </TitleContainer>

        <ButtonWrapper>
          <Button
            size="medium"
            fontsize="large"
            variant={student.status ? "warning" : "success"}
            icon={
              student.status ? (
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
            {student.status ? "Dar de baja" : "Dar de alta"}
          </Button>
        </ButtonWrapper>
      </HeaderContainer>

      <StudentNameContainer>
        <Title>
          <IconStyles>
            <img src={StudentIcon} alt="student-icon" />
          </IconStyles>
          {student.name} {student.lastName}
        </Title>
      </StudentNameContainer>
      <InfoBoxesContainer>
        <StudentData student={student} navigate={navigate} />
        <PaymentData student={student} navigate={navigate} />
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
  const info = [
    {
      title: "Nombre",
      data: student.name,
    },
    {
      title: "Apellido",
      data: student.lastName,
    },
    {
      title: "DNI",
      data: student.dni,
    },
    {
      title: "Fecha de ingreso",
      data: student.admissionDate,
    },
    {
      title: "Fecha de nacimiento",
      data: `${student.birthday} (${student.age} años)`,
    },
    {
      title: "Número de teléfono",
      data: student.cellphoneNumber,
    },
  ];
  return (
    <StudentInfoContainer>
      <HeaderBoxes>
        <SubTitle>
          <IconStyles>
            <img src={StudentIcon} alt="student-icon" width={20} height={20} />
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
        {info.map((item, index) => (
          <InformationContainer key={index}>
            <Label>{item.title}</Label>
            <StudentInfo>{item.data}</StudentInfo>
          </InformationContainer>
        ))}
      </AllInformationContainer>
      <InformationContainer key={"Patologías"}>
        <Label>Patologías</Label>
        <StudentInfo>{student.pathologies}</StudentInfo>
      </InformationContainer>
    </StudentInfoContainer>
  );
};
const PaymentData = ({
  student,
  navigate,
}: {
  student: StudentDetailResponse;
  navigate: (path: string, options?: { state?: any }) => void;

}) => {
  const info = [
    {
      title: "Forma de pago",
      data: student.paymentPlanName,
    },
    {
      title: "Estado del alumno",
      data: student.status ? "Activo" : "Inactivo",
      component: (
        <StudentStatusStyle $status={student.status}>
          {student.status ? "Activo" : "Inactivo"}
        </StudentStatusStyle>
      ),
    },
    {
      title: "Día de pago",
      data:
        student.paymentPlanName === "Principio de mes"
          ? "1-10"
          : student.paymentDay,
    },
    {
      title: "Situación del alumno",
      data: student.situation,
      component: (
        <StudentSituationStyle $situation={student.situation}>
          {student.situation}
        </StudentSituationStyle>
      ),
    },
  ];
  return (
    <PaymentInfoContainer>
      <HeaderBoxes>
        <SubTitle>
          <IconStyles>
            <img src={InfoIcon} alt="info-icon" />
          </IconStyles>
          Datos de pago y estados
        </SubTitle>
        <EditIconStyles onClick={() => navigate(`/editar-estudiante/2`, { state: { studentId: student.id }, })}>
          <img src={EditIcon} alt="edit-icon"></img>
        </EditIconStyles>
      </HeaderBoxes>
      <AllInformationContainer>
        {info.map((item, index) => (
          <InformationContainer key={index}>
            <Label>{item.title}</Label>
            {item.component ? (
              item.component
            ) : (
              <StudentInfo>{item.data}</StudentInfo>
            )}
          </InformationContainer>
        ))}
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

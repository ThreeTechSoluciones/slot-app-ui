import {
  InformationContainer,
  Label,
  MainContainer,
  StudentNameContainer,
  HeaderBoxes,
  IconStyles,
  ButtonWrapper,
  AllInformationContainer,
  PaymentInfoContainer,
  SlotInfoContainer,
  SearchNotFoundStyles,
  NotFoundStudentMessage,
  InfoBoxesContainer,
  StudentInfo,
  EditIconStyles,
  HeaderContainer,
  StudentInfoContainer,
  ButtonContainer,
  SubTitle,
  Title,
  SlotTitleContainer,
  PlanContainer,
  TitleContainer,
  SlotsContainer,
  AssignedPlan,
  DaysPlan,
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
import CalendarIcon from "../../assets/CalenderIcon.png";
import Button from "../../components/button/Button";
import { ConfirmDialog } from "../../components/confirm_dialog/ConfirmDialog";
import {
  getEditarEstudianteStep,
  ListadoCuotas,
} from "../../routes/RoutesUtils";
import toast from "react-hot-toast";
import { useState } from "react";
import type { StudentDetailResponse } from "../../app/types/responses/StudentDetailResponse.type";
import {
  mapStudentSlotInfo,
  studentPaymentInfo,
  studentPersonalInfo,
} from "../../utils/StudentDetailInfo";
import { SearchNotFound } from "../../components/search_not_found/SearchNotFound";
import SlotDetail from "../../components/slotDetail/SlotDetail";

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
        <SlotData student={student} navigate={navigate} />
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
  const info = studentPersonalInfo(student);
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
            onClick={() =>
              navigate(getEditarEstudianteStep(1), {
                state: { studentId: student.id },
              })
            }
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
      {student.pathologies && student.pathologies.trim() !== "" && (
        <InformationContainer key={"Patologías"}>
          <Label>Patologías</Label>
          <StudentInfo>{student.pathologies}</StudentInfo>
        </InformationContainer>
      )}
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
  const info = studentPaymentInfo(student);

  return (
    <PaymentInfoContainer>
      <HeaderBoxes>
        <SubTitle>
          <IconStyles>
            <img src={InfoIcon} alt="info-icon" />
          </IconStyles>
          Datos de pago y estados
        </SubTitle>
        <EditIconStyles
          onClick={() =>
            navigate(getEditarEstudianteStep(2), {
              state: { studentId: student.id },
            })
          }
        >
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
            onClick={() =>
              navigate(ListadoCuotas, { state: { studentId: student.id } })
            }
          >
            Ver cuotas
          </Button>
        </ButtonContainer>
      </AllInformationContainer>
    </PaymentInfoContainer>
  );
};
const SlotData = ({
  student,
  navigate,
}: {
  student: StudentDetailResponse;
  navigate: (path: string, options?: { state?: any }) => void;
}) => {
  const slots = mapStudentSlotInfo(student);
  const hasSlots = slots.length > 0;

  return (
    <SlotInfoContainer>
      <HeaderBoxes>
        <SlotTitleContainer>
          <img
            src={CalendarIcon}
            width={"24px"}
            height={"24px"}
            style={{ paddingLeft: "16px" }}
          ></img>
          Turnos asignados
        </SlotTitleContainer>

        <EditIconStyles onClick={() =>
          navigate(getEditarEstudianteStep(3), {
            state: { studentId: student.id },
          })
        }>
          <img src={EditIcon} alt="edit-icon" />
        </EditIconStyles>
      </HeaderBoxes>

      <PlanContainer>
        <AssignedPlan>Plan asignado</AssignedPlan>
        <DaysPlan>{student.plan}</DaysPlan>
      </PlanContainer>

      {hasSlots ? (
        <SlotsContainer>
          <SlotDetail slots={slots} />
        </SlotsContainer>
      ) : (
        <SearchNotFoundStyles>
          <SearchNotFound message="Este alumno aún no tiene turnos asignados" />
        </SearchNotFoundStyles>
      )}
    </SlotInfoContainer>
  );
};

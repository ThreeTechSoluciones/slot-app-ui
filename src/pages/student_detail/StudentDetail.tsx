import * as s from './StudentDetail.styles';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import {
  useDeleteStudentMutation,
  useGetStudentByIdQuery,
} from '../../app/services/StudentService';
import StudentIcon from '../../assets/student-icon.svg';
import BackIcon from '../../assets/back-icon.svg';
import InfoIcon from '../../assets/info-icon.svg';
import EditIcon from '../../assets/edit-icon.svg';
import DesactivateIcon from '../../assets/desactivate-icon.svg';
import CalendarIcon from '../../assets/CalenderIcon.png';
import Button from '../../components/button/Button';
import { ConfirmDialog } from '../../components/confirm_dialog/ConfirmDialog';
import { DarAltaAlumno, getEditarEstudianteStep, ListadoCuotas } from '../../routes/RoutesUtils';
import toast from 'react-hot-toast';
import { useState } from 'react';
import type { StudentDetailResponse } from '../../app/types/responses/StudentDetailResponse.type';
import {
  mapStudentSlotInfo,
  studentPaymentInfo,
  studentPersonalInfo,
} from '../../utils/StudentDetailInfo';
import { SearchNotFound } from '../../components/search_not_found/SearchNotFound';
import SlotDetail from '../../components/slotDetail/SlotDetail';
import { DisabledIcon } from '../../components/disabled_icon/DisabledIcon';
import BicycleLoader from '../../components/bicycle_animation/BicycleLoader';

const StudentDetail = () => {
  const { studentId } = useLocation().state;
  const { data: student, isError, isLoading } = useGetStudentByIdQuery(studentId);
  const [desactivateStudent] = useDeleteStudentMutation();
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const deactivateStudentAndShowMessage = (studentId: string) => {
    desactivateStudent(studentId)
      .unwrap()
      .then(() => {
        toast.success('Alumno dado de baja.');
      })
      .finally(() => {
        setShowConfirm(false);
      });
  };
  const handleNavigateToActivate = () => {
    navigate(DarAltaAlumno, {
      state: {
        studentId: student?.id,
      },
    });
  };
  const handleConfirm = () => {
    if (student?.status) {
      setShowConfirm(true);
    } else {
      handleNavigateToActivate();
    }
  };

  if (isLoading) return <BicycleLoader />;

  if (isError || !student)
    return (
      <div>
        <s.NotFoundStudentMessage>
          Ocurrió un error al buscar la información del alumno. <br />
          Intente nuevamente
        </s.NotFoundStudentMessage>
      </div>
    );
  const isStudentInactive = !student.status;
  return (
    <s.MainContainer>
      {showConfirm && (
        <ConfirmDialog
          message={`¿Estás seguro de dar de baja
           a ${student.name} ${student.lastName}?`}
          onConfirm={() => deactivateStudentAndShowMessage(studentId)}
          onCancel={() => setShowConfirm(false)}
        />
      )}
      <s.HeaderContainer>
        <s.TitleContainer>
          <img
            src={BackIcon}
            alt="back-icon"
            onClick={() => navigate(-1)}
            style={{ cursor: 'pointer' }}
          />

          <s.Title>DETALLE DEL ALUMNO</s.Title>
        </s.TitleContainer>

        <s.ButtonWrapper>
          <Button
            size="medium"
            fontsize="large"
            variant={student.status ? 'warning' : 'success'}
            icon={
              student.status ? (
                <img src={DesactivateIcon} alt="desactivate-icon" />
              ) : (
                <img
                  src={DesactivateIcon}
                  alt="activate-icon"
                  style={{ transform: 'rotate(180deg)' }}
                />
              )
            }
            onClick={handleConfirm}
          >
            {student.status ? 'Dar de baja' : 'Dar de alta'}
          </Button>
        </s.ButtonWrapper>
      </s.HeaderContainer>

      <s.StudentNameContainer>
        <s.Title>
          <s.IconStyles>
            <img src={StudentIcon} alt="student-icon" />
          </s.IconStyles>
          {student.name} {student.lastName}
        </s.Title>
      </s.StudentNameContainer>
      <s.InfoBoxesContainer>
        <StudentData student={student} navigate={navigate} isStudentInactive={isStudentInactive} />
        <PaymentData student={student} navigate={navigate} isStudentInactive={isStudentInactive} />
        <SlotData student={student} navigate={navigate} isStudentInactive={isStudentInactive} />
      </s.InfoBoxesContainer>
    </s.MainContainer>
  );
};

export default StudentDetail;
const StudentData = ({
  student,
  navigate,
  isStudentInactive,
}: {
  student: StudentDetailResponse;
  navigate: (path: string, options?: { state?: any }) => void;
  isStudentInactive: boolean;
}) => {
  const info = studentPersonalInfo(student);

  return (
    <s.StudentInfoContainer>
      <s.HeaderBoxes>
        <s.SubTitle>
          <s.IconStyles>
            <img src={StudentIcon} alt="student-icon" width={20} height={20} />
          </s.IconStyles>
          Datos del alumno
        </s.SubTitle>
        <s.EditIconStyles>
          <DisabledIcon
            tooltip="Editar datos del alumno"
            disabled={isStudentInactive}
            disabledTooltip="Alumno inactivo"
            onClick={() =>
              navigate(getEditarEstudianteStep(1), {
                state: { studentId: student.id },
              })
            }
          >
            <img src={EditIcon} alt="edit-icon" />
          </DisabledIcon>
        </s.EditIconStyles>
      </s.HeaderBoxes>
      <s.AllInformationContainer>
        {info.map((item, index) => (
          <s.InformationContainer key={index}>
            <s.Label>{item.title}</s.Label>
            <s.StudentInfo>{item.data}</s.StudentInfo>
          </s.InformationContainer>
        ))}
      </s.AllInformationContainer>
      {student.pathologies && student.pathologies.trim() !== '' && (
        <s.InformationContainer key={'Patologías'}>
          <s.Label>Patologías</s.Label>
          <s.StudentInfo>{student.pathologies}</s.StudentInfo>
        </s.InformationContainer>
      )}
    </s.StudentInfoContainer>
  );
};
const PaymentData = ({
  student,
  navigate,
  isStudentInactive,
}: {
  student: StudentDetailResponse;
  navigate: (path: string, options?: { state?: any }) => void;
  isStudentInactive: boolean;
}) => {
  const info = studentPaymentInfo(student);

  return (
    <s.PaymentInfoContainer>
      <s.HeaderBoxes>
        <s.SubTitle>
          <s.IconStyles>
            <img src={InfoIcon} alt="info-icon" />
          </s.IconStyles>
          Datos de pago y estados
        </s.SubTitle>
        <s.EditIconStyles>
          <DisabledIcon
            tooltip="Editar datos de pago"
            disabled={isStudentInactive}
            disabledTooltip="Alumno inactivo"
            onClick={() =>
              navigate(getEditarEstudianteStep(2), {
                state: { studentId: student.id },
              })
            }
          >
            <img src={EditIcon} alt="edit-icon" />
          </DisabledIcon>
        </s.EditIconStyles>
      </s.HeaderBoxes>
      <s.AllInformationContainer>
        {info.map((item, index) => (
          <s.InformationContainer key={index}>
            <s.Label>{item.title}</s.Label>
            {item.component ? item.component : <s.StudentInfo>{item.data}</s.StudentInfo>}
          </s.InformationContainer>
        ))}
        <s.ButtonContainer>
          <Button
            variant="primary"
            size="large"
            fontsize="medium"
            onClick={() => navigate(ListadoCuotas, { state: { studentId: student.id } })}
          >
            Ver cuotas
          </Button>
        </s.ButtonContainer>
      </s.AllInformationContainer>
    </s.PaymentInfoContainer>
  );
};
const SlotData = ({
  student,
  navigate,
  isStudentInactive,
}: {
  student: StudentDetailResponse;
  navigate: (path: string, options?: { state?: any }) => void;
  isStudentInactive: boolean;
}) => {
  const slots = mapStudentSlotInfo(student);
  const hasSlots = slots.length > 0;

  return (
    <s.SlotInfoContainer>
      <s.HeaderBoxes>
        <s.SlotTitleContainer>
          <img
            src={CalendarIcon}
            width={'24px'}
            height={'24px'}
            style={{ paddingLeft: '16px' }}
          ></img>
          Turnos asignados
        </s.SlotTitleContainer>

        <s.EditIconStyles>
          <DisabledIcon
            tooltip="Editar turnos"
            disabled={isStudentInactive}
            disabledTooltip="Alumno inactivo"
            onClick={() =>
              navigate(getEditarEstudianteStep(3), {
                state: { studentId: student.id },
              })
            }
          >
            <img src={EditIcon} alt="edit-icon" />
          </DisabledIcon>
        </s.EditIconStyles>
      </s.HeaderBoxes>

      <s.PlanContainer>
        <s.AssignedPlan>Plan asignado</s.AssignedPlan>
        <s.DaysPlan>{student.plan}</s.DaysPlan>
      </s.PlanContainer>

      {hasSlots ? (
        <s.SlotsContainer>
          <SlotDetail slots={slots} />
        </s.SlotsContainer>
      ) : (
        <s.SearchNotFoundStyles>
          <SearchNotFound message="Este alumno aún no tiene turnos asignados" />
        </s.SearchNotFoundStyles>
      )}
    </s.SlotInfoContainer>
  );
};

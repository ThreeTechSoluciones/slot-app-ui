import * as s from './CalendarViewPage.styles';
import { useGetCalendarViewQuery } from '../../app/services/UserService';
import { useMarkStudentAbsenceMutation, useRecoverStudentSlotMutation } from '../../app/services/StudentService';
import useAuthentication from '../../hooks/useAuthentication';
import { DaysOfWeekTranslation } from '../../utils/DaysOfWeek';
import { CalendarViewName } from '../../app/types/models/CalendarViewName';
import { SearchNotFound } from '../../components/search_not_found/SearchNotFound';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { formatDateToIsoString } from '../../utils/DateFormatter';
import Slot from './slot/SpecificSlotActions';
import NextIcon from '../../assets/next-arrow-icon.svg';
import BackIcon from '../../assets/back-arrow-icon.svg';
import CalendarIcon from '../../assets/calendar-icon.svg';
import { CalendarMonth } from '../../utils/MonthsOfYear';
import InputDate from '../../components/date/inputDate';
import { CalendarActionsType, type CalendarAction, type CalendarModalType } from './CalendarUtils';
import Modal from '../../components/unified_modal/Modal';
import { ConfirmDialog } from '../../components/confirm_dialog/ConfirmDialog';
import { useCancelSpecificSlotMutation } from '../../app/services/SpecificSlotService';
import RegisterAbsence from './registerAbsence/RegisterAbsence';
import { StudentRecover } from './studentRecover/StudentRecover';

function CalendarView() {
  const { userId } = useAuthentication();

  const [selectDate, setSelectDate] = useState<Date>(new Date());
  const [openModal, setOpenModal] = useState<boolean>(false);
  
  const [recoverSlot] = useRecoverStudentSlotMutation();
  const [markAbsence] = useMarkStudentAbsenceMutation();
  const [cancelSlot] = useCancelSpecificSlotMutation();

  const [slotAction, setSlotAction] = useState<CalendarAction | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  const closeModal = () => setSlotAction(null);

  const { data: calendarData } = useGetCalendarViewQuery({
    userId: userId!,
    date: formatDateToIsoString(selectDate),
    typeOfView: CalendarViewName.WEEKLY,
  });

  const calculateWeek = (days: number) => {
    setSelectDate(new Date(selectDate.setDate(selectDate.getDate() + days)));
  };

  const calendarPlaceholder = () => {
    const month = CalendarMonth[selectDate!.getMonth()];
    const year = selectDate!.getFullYear();
    return `${month} ${year}`;
  };

  const handleConfirmAbsence = () => {
    if (slotAction?.type !== 'ABSENCE') return;
    markAbsence({
      studentId: slotAction.studentId,
      specificSlotId: slotAction.specificSlotId,
    })
      .unwrap()
      .then(() => toast.success(`Ausencia registrada`))
      .finally(closeModal);
  };

  const SelectDateContainer = () => {
    return (
      <s.NavigationDateContainer>
        <s.NavigationArrow onClick={() => calculateWeek(-7)}>
          <img src={BackIcon} />
        </s.NavigationArrow>
        <s.CustomDisplayContainer>
          <s.CustomDisplay>{calendarPlaceholder()}</s.CustomDisplay>
          <s.InputDateContainer>
            <InputDate
              value={selectDate}
              onChange={(date) => {
                if (date instanceof Date) {
                  setSelectDate(date);
                }
              }}
              format="dd/MM/yyyy"
              calendarPosition="top"
              locale="es-ES"
              clearIcon={null}
              calendarIcon={
                <img src={CalendarIcon} alt="Calendario" style={{ width: 20, height: 20 }} />
              }
            />
          </s.InputDateContainer>
        </s.CustomDisplayContainer>
        <s.NavigationArrow onClick={() => calculateWeek(7)}>
          <img src={NextIcon} />
        </s.NavigationArrow>
      </s.NavigationDateContainer>
    );
  };

  const columnsCount = calendarData?.days.length || 0;
  if (columnsCount === 0) {
    return (
      <s.NoResponseContainer>
        <SelectDateContainer />
        <s.Spacing>
          <SearchNotFound message="No hay turnos para mostrar" />
        </s.Spacing>
      </s.NoResponseContainer>
    );
  }

  const handleConfirmCancel = async () => {
    const specificSlotId = slotAction?.specificSlotId;
    if (!specificSlotId) {
      toast.error('Hubo un error al cancelar el turno. Intenta nuevamente.');
      return;
    };

    cancelSlot({ specificSlotId })
      .unwrap()
      .then(() => {
        toast.success('Turno cancelado');
        closeModal();
      });
  };

  
  const handleConfirmRecover = async () => {
    if (!slotAction ||  slotAction?.type !== 'RECOVER' || !selectedStudent) return;

    const studentId = selectedStudent;
    const specificSlotId = slotAction.specificSlotId;

    return recoverSlot({ studentId, specificSlotId })
      .unwrap()
      .then(() => {
        toast.success(`Recuperación registrada`);
        closeModal();
      });
  };

  
  const modalConfig: Record<CalendarActionsType, CalendarModalType> = {
    [CalendarActionsType.CANCEL]: {
      content: <ConfirmDialog message='¿Estás seguro que deseas cancelar el turno?' />,
      primaryButtonText: 'Cancelar',
      secondaryButtonText: 'No',
      onConfirm: handleConfirmCancel,
      title: 'Cancelar turno'
    },

    [CalendarActionsType.ABSENCE]: {
      // TODO: Agregar nombre del estudiante en el texto
      content: <RegisterAbsence />,
      primaryButtonText: 'Registrar Inasistencia',
      secondaryButtonText: 'Cancelar',
      onConfirm: handleConfirmAbsence,
      title: 'Registrar Inasistencia'
    },
    [CalendarActionsType.RECOVER]: {
      // TODO: Agregar capacidad disponible y nombre del turno en el texto
      content: <StudentRecover availableCapacity={27} setSelectedStudent={setSelectedStudent} />,
      primaryButtonText: 'Registrar',
      secondaryButtonText: 'Cancelar',
      onConfirm: handleConfirmRecover,
      title: 'AGREGAR ALUMNO'
    }
  };

  return (
    <s.MainContainer>
      <SelectDateContainer />
      <s.CalendarContainer $columnsCount={columnsCount}>
        <s.ScheduledTime>
          {calendarData?.times.map((timeSlot) => (
            <s.TimeSlot key={timeSlot.startTime}>
              {timeSlot.startTime} <br /> - <br />
              {timeSlot.endTime}
            </s.TimeSlot>
          ))}
        </s.ScheduledTime>
        {calendarData?.days.map((day, colIndex) => (
          <s.DayColumn key={day.dayOfWeek}>
            <s.DayContainer>
              <s.DayOfWeek>{DaysOfWeekTranslation[day.dayOfWeek]}</s.DayOfWeek>
              <s.Number $isCurrentDay={day.current}>{day.numberOfDay}</s.Number>
            </s.DayContainer>
            {calendarData?.times.map((_, rowIndex) => {
              const slot = calendarData.slots[rowIndex][colIndex];
              if (!slot) {
                return <s.SpecificEmptySlot key={`empty-${rowIndex}-${colIndex}`} />;
              }
              return (
                <Slot
                  key={slot.id}
                  slot={slot}
                  columnsCount={columnsCount}
                  dayOfWeek={day.dayOfWeek}
                  rowIndex={rowIndex}
                  setSlotAction={setSlotAction}
                  setOpenModal={setOpenModal}
                />
              );
            })}
          </s.DayColumn>
        ))}
        {slotAction && (
          <Modal
            active={openModal}
            title={modalConfig[slotAction.type].title}
            primaryButtonText={modalConfig[slotAction.type].primaryButtonText}
            secondaryButtonText={modalConfig[slotAction.type].secondaryButtonText}
            onConfirm={modalConfig[slotAction.type].onConfirm}
            onCancel={() => setOpenModal(false)}
          >
            {modalConfig[slotAction.type].content}
          </Modal>
        )}
      </s.CalendarContainer>
    </s.MainContainer>
  );
}

export default CalendarView;

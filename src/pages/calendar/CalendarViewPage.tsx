import * as s from './CalendarViewPage.styles';
import { useGetCalendarViewQuery } from '../../app/services/UserService';
import {
  useMarkStudentAbsenceMutation,
  useRecoverStudentSlotMutation,
} from '../../app/services/StudentService';
import useAuthentication from '../../hooks/useAuthentication';
import StudentIcon from '../../assets/user-icon.svg';
import { DaysOfWeekTranslation } from '../../utils/DaysOfWeek';
import { CalendarViewName } from '../../app/types/models/CalendarViewName';
import { SearchNotFound } from '../../components/search_not_found/SearchNotFound';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { formatDateToIsoString } from '../../utils/DateFormatter';
import Slot from './slot/SpecificSlotActions';
import ChevronIcon from '../../assets/chevron-left-icon.svg';
import CalendarIcon from '../../assets/calendar-icon.svg';
import { CalendarMonth } from '../../utils/MonthsOfYear';
import InputDate from '../../components/date/inputDate';
import { CalendarActionsType, type CalendarAction } from './CalendarUtils';
import Modal, { type ModalProps } from '../../components/unified_modal/Modal';
import { ConfirmDialog } from '../../components/confirm_dialog/ConfirmDialog';
import { useCancelSpecificSlotMutation } from '../../app/services/SpecificSlotService';
import RegisterAbsence from './registerAbsence/RegisterAbsence';
import { StudentRecover } from './studentRecover/StudentRecover';
import { capitalize } from '../../utils/CapitalizeWords';
import BicycleLoader from '../../components/bicycle_animation/BicycleLoader';

const EMPTY_ACTION: CalendarAction = {
  type: CalendarActionsType.NONE,
  specificSlotId: '',
};

function CalendarView() {
  const { userId } = useAuthentication();

  const [selectDate, setSelectDate] = useState<Date>(new Date());
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [recoverSlot] = useRecoverStudentSlotMutation();
  const [markAbsence] = useMarkStudentAbsenceMutation();
  const [cancelSlot] = useCancelSpecificSlotMutation();

  const [slotAction, setSlotAction] = useState<CalendarAction>(EMPTY_ACTION);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  const closeModal = () => {
    setSlotAction(EMPTY_ACTION);
    setOpenModal(false);
  };

  const {
    data: calendarData,

    isFetching,
  } = useGetCalendarViewQuery({
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
    if (slotAction?.type !== 'ABSENCE' || !slotAction.specificSlotId || !slotAction.studentId)
      return;

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
          <img src={ChevronIcon} />
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
          <img src={ChevronIcon} style={{ transform: 'rotate(180deg)' }} />
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
          {isFetching ? <BicycleLoader /> : <SearchNotFound message="No hay turnos para mostrar" />}
        </s.Spacing>
      </s.NoResponseContainer>
    );
  }

  const handleConfirmCancel = async () => {
    const specificSlotId = slotAction?.specificSlotId;
    if (!specificSlotId) {
      toast.error('Hubo un error al cancelar el turno. Intenta nuevamente.');
      return;
    }

    cancelSlot({ specificSlotId })
      .unwrap()
      .then(() => {
        toast.success('Turno cancelado');
        closeModal();
      });
  };

  const handleConfirmRecover = async () => {
    if (
      !slotAction ||
      slotAction?.type !== 'RECOVER' ||
      !selectedStudent ||
      !slotAction.specificSlotId
    )
      return;

    const studentId = selectedStudent;
    const specificSlotId = slotAction.specificSlotId;

    return recoverSlot({ studentId, specificSlotId })
      .unwrap()
      .then(() => {
        toast.success(`Recuperación registrada`);
        closeModal();
      });
  };

  const modalConfig: Record<CalendarActionsType, ModalProps> = {
    [CalendarActionsType.CANCEL]: {
      children: (
        <ConfirmDialog
          message={
            <>
              ¿Estás seguro de cancelar el turno del
              <br />
              {capitalize(DaysOfWeekTranslation[slotAction.dayOfWeek!])} de{' '}
              {slotAction.slot?.startTime} a {slotAction.slot?.endTime}?
            </>
          }
        />
      ),
      primaryButtonText: 'Aceptar',
      secondaryButtonText: 'No',
      onConfirm: handleConfirmCancel,
    },

    [CalendarActionsType.ABSENCE]: {
      children: <RegisterAbsence studentName={slotAction.studentName} />,
      primaryButtonText: 'Aceptar',
      secondaryButtonText: 'Cancelar',
      onConfirm: handleConfirmAbsence,
    },
    [CalendarActionsType.RECOVER]: {
      children: (
        <StudentRecover
          availableCapacity={slotAction.availableCapacity!}
          setSelectedStudent={setSelectedStudent}
        />
      ),
      primaryButtonText: 'Registrar',
      secondaryButtonText: 'Cancelar',
      onConfirm: handleConfirmRecover,
      title: 'AGREGAR ALUMNO',
    },
    [CalendarActionsType.NONE]: {
      children: <></>,
    },
  };

  return (
    <s.MainContainer>
      <Modal
        active={openModal}
        title={modalConfig[slotAction.type].title}
        primaryButtonText={modalConfig[slotAction.type].primaryButtonText}
        secondaryButtonText={modalConfig[slotAction.type].secondaryButtonText}
        onConfirm={modalConfig[slotAction.type].onConfirm}
        onCancel={() => setOpenModal(false)}
      >
        {modalConfig[slotAction.type].children}
      </Modal>
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
      </s.CalendarContainer>
    </s.MainContainer>
  );
}

export default CalendarView;

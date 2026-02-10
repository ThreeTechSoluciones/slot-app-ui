import * as s from "./CalendarViewPage.styles";
import { useGetCalendarViewQuery } from "../../app/services/UserService";
import { useMarkStudentAbsenceMutation } from "../../app/services/StudentService";
import useAuthentication from "../../hooks/useAuthentication";
import StudentIcon from "../../assets/student-icon.svg";
import { DaysOfWeekTranslation } from "../../utils/DaysOfWeek";
import { CalendarViewName } from "../../app/types/models/CalendarViewName";
import { SearchNotFound } from "../../components/search_not_found/SearchNotFound";
import { useState } from "react";
import { GenericModal } from "../../components/generic_modal/GenericModal";
import { toast } from "react-hot-toast";
import { formatDateToIsoString } from "../../utils/DateFormatter";
import { StudentRecover } from "./studentRecover/StudentRecover";
import { CancelSlot } from "./cancelSlot/CancelSlot";
import { capitalize } from "../../utils/CapitalizeWords";
import Slot from "./slot/SpecificSlotActions";
import NextIcon from "../../assets/next-arrow-icon.svg";
import BackIcon from "../../assets/back-arrow-icon.svg";
import CalendarIcon from "../../assets/calendar-icon.svg";
import { CalendarMonth } from "../../utils/MonthsOfYear";
import InputDate from "../../components/date/inputDate";
import type { Student } from "../../app/types/responses/CalendarResponse.type";
type CalendarAction =
  | {
      type: "ABSENCE";
      studentId: string;
      studentName: string;
      specificSlotId: string;
    }
  | { type: "RECOVER"; specificSlotId: string; availableCapacity: number }
  | {
      type: "CANCEL";
      specificSlotId: string;
      dayOfWeek: string;
      slot: { startTime: string; endTime: string };
    };

function CalendarView() {
  const { userId } = useAuthentication();

  const [selectDate, setSelectDate] = useState<Date>(new Date());

  const [markAbsence] = useMarkStudentAbsenceMutation();
  const [slotAction, setSlotAction] = useState<CalendarAction | null>(null);
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
    if (slotAction?.type !== "ABSENCE") return;
    markAbsence({
      studentId: slotAction.studentId,
      specificSlotId: slotAction.specificSlotId,
    })
      .unwrap()
      .then(() => toast.success("Se ha registrado la inasistencia"))
      .finally(closeModal);
  };

  const SelectDateContainer = () => {
    return (
      <s.NavigationDateContainer>
        <s.NavigationArrow onClick={() => calculateWeek(-7)}>
          <img src={BackIcon} style={{ marginLeft: "8px" }} />
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
                <img
                  src={CalendarIcon}
                  alt="Calendario"
                  style={{ width: 20, height: 20 }}
                />
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
          <SearchNotFound />
        </s.Spacing>
      </s.NoResponseContainer>
    );
  }

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
              <s.Number>{day.numberOfDay}</s.Number>
            </s.DayContainer>
            {calendarData?.times.map((_, rowIndex) => {
              const slot = calendarData.slots[rowIndex][colIndex];
              if (!slot) {
                return (
                  <s.SpecificEmptySlot key={`empty-${rowIndex}-${colIndex}`} />
                );
              }
              return (
                <Slot
                  key={slot.id}
                  slot={slot}
                  columnsCount={columnsCount}
                  dayOfWeek={day.dayOfWeek}
                  rowIndex={rowIndex}
                  setSlotAction={setSlotAction}
                />
              );
            })}
          </s.DayColumn>
        ))}
        {slotAction?.type === "ABSENCE" && (
          <GenericModal
            isOpen={true}
            icon={StudentIcon}
            title={slotAction.studentName}
            isConfirmModal
            onCancel={closeModal}
            onConfirm={handleConfirmAbsence}
            confirmText="Registrar Inasistencia"
            cancelText="Cancelar"
            width="480px"
            height="226px"
          ></GenericModal>
        )}
        {slotAction?.type === "RECOVER" && (
          <StudentRecover
            selectedSlotId={slotAction.specificSlotId}
            availableCapacity={slotAction.availableCapacity}
            onCancel={closeModal}
          />
        )}
        {slotAction && slotAction.type === "RECOVER" && (
          <StudentRecover
            selectedSlotId={slotAction.specificSlotId}
            availableCapacity={slotAction.availableCapacity}
            onCancel={closeModal}
          />
        )}
        {slotAction?.type === "CANCEL" && (
          <CancelSlot
            isOpen
            specificSlotId={slotAction.specificSlotId}
            onCancel={closeModal}
            dayOfWeek={capitalize(DaysOfWeekTranslation[slotAction.dayOfWeek])}
            slot={slotAction.slot}
          />
        )}
      </s.CalendarContainer>
    </s.MainContainer>
  );
}

export default CalendarView;

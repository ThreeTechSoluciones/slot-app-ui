import * as s from "./CalendarViewPage.styles";
import { useGetCalendarViewQuery } from "../../app/services/UserService";
import { useMarkStudentAbsenceMutation } from "../../app/services/StudentService";
import useAuthentication from "../../hooks/useAuthentication";
import StudentIcon from "../../assets/student-icon.svg";
import { DaysOfWeekTranslation } from "../../utils/DaysOfWeek";
import { CalendarViewName } from "../../app/types/models/CalendarViewName";
import { SearchNotFound } from "../../components/search_not_found/SearchNotFound";
import { useMemo, useState } from "react";
import { GenericModal } from "../../components/generic_modal/GenericModal";
import { toast } from "react-hot-toast";
import { formatDateToIsoString } from "../../utils/DateFormatter";
import { StudentRecover } from "./studentRecover/StudentRecover";
import Slot from "./slot/Slot";

export type CalendarAction =
  | {
    type: "ABSENCE";
    studentId: string;
    studentName: string;
    specificSlotId: string;
  }
  | { type: "RECOVER"; specificSlotId: string };

function CalendarView() {
  const { userId } = useAuthentication();

  const [markAbsence] = useMarkStudentAbsenceMutation();

  const [filter, setFilter] = useState<string>("");

  const { data: calendarData } = useGetCalendarViewQuery({
    userId: userId!,
    date: "2026-02-02",
    // date: formatDateToIsoString(new Date()),
    typeOfView: CalendarViewName.WEEKLY,
  });

  const [slotAction, setSlotAction] = useState<CalendarAction | null>(null);

  const closeModals = () => setSlotAction(null);
  const handleConfirmAbsence = () => {
    if (slotAction?.type === "ABSENCE") {
      markAbsence({
        studentId: slotAction.studentId,
        specificSlotId: slotAction.specificSlotId,
      })
        .unwrap()
        .then(() => toast.success("Se ha registrado la inasistencia"))
        .finally(closeModals);
    }
  };

  const selectedSlot = useMemo(() => {
    if (!calendarData || slotAction?.type !== "RECOVER") return null;

    return (
      calendarData.slots
        .flat()
        .find((slot) => slot?.id === slotAction.specificSlotId) ?? null
    );
  }, [calendarData, slotAction]);
  const availableCapacity = selectedSlot
    ? selectedSlot.maxCapacity - selectedSlot.capacity
    : 0;
  const columnsCount = calendarData?.days.length || 0;
  if (columnsCount === 0) {
    return (
      <s.NoResponseContainer>
        <SearchNotFound />
      </s.NoResponseContainer>
    );
  }


  return (
    <s.MainContainer>
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

              return (
                <Slot
                  slot={slot}
                  rowIndex={rowIndex}
                  columnsCount={columnsCount}
                  setSlotAction={setSlotAction}
                />

              );
            })}
          </s.DayColumn>
        ))}
        {slotAction?.type === "ABSENCE" && (
          <GenericModal
            icon={StudentIcon}
            title={slotAction.studentName}
            isConfirmModal
            onCancel={closeModals}
            onConfirm={handleConfirmAbsence}
            confirmText="Registrar Inasistencia"
            cancelText="Cancelar"
            width="480px"
            height="226px"
          ></GenericModal>
        )}
        <StudentRecover
          isOpen={slotAction?.type === "RECOVER"}
          selectedSlotId={slotAction?.specificSlotId || null}
          availableCapacity={availableCapacity}
          onClose={closeModals}
        />
        ;
      </s.CalendarContainer>
    </s.MainContainer>
  );
}
export default CalendarView;

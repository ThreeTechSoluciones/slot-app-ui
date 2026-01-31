import * as s from "./CalendarViewPage.styles";
import {
  useGetCalendarViewQuery,
  useGetUserStudentsQuery,
} from "../../app/services/UserService";
import {
  useMarkStudentAbsenceMutation,
  useRecoverStudentSlotMutation,
} from "../../app/services/StudentService";
import CheckIcon from "../../assets/check.svg";
import useAuthentication from "../../hooks/useAuthentication";
import UserIcon from "../../assets/white-user-icon.svg";
import ProgressIcon from "../../assets/progress-icon.svg";
import PlusIcon from "../../assets/plus-icon.svg";
import StudentIcon from "../../assets/student-icon.svg";
import { DaysOfWeekTranslation } from "../../utils/DaysOfWeek";
import { StatesTranslation } from "../../utils/StatesTranslation";
import { CalendarViewName } from "../../app/types/models/CalendarViewName";
import type {
  SpecificSlotResponse,
  Student,
} from "../../app/types/responses/CalendarResponse.type";
import { SearchNotFound } from "../../components/search_not_found/SearchNotFound";
import { useMemo, useState } from "react";
import { GenericModal } from "../../components/generic_modal/GenericModal";
import { toast } from "react-hot-toast";
import { formatDateToIsoString } from "../../utils/DateFormatter";
import { StudentRecover } from "./studentRecover/StudentRecover";
type CalendarAction =
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
  const [recoverSlot] = useRecoverStudentSlotMutation();

  const { data: calendarData } = useGetCalendarViewQuery({
    userId: userId!,
    date: formatDateToIsoString(new Date()),
    typeOfView: CalendarViewName.WEEKLY,
  });

  const { data: studentsResponse } = useGetUserStudentsQuery({
    userId: userId!,
    filterByAbsences: true,
  });
  const studentsToRecover = studentsResponse?.content ?? [];

  const [slotAction, setSlotAction] = useState<CalendarAction | null>(null);

  const handleAbsenceSlot = (student: Student, specificSlotId: string) => {
    setSlotAction({
      type: "ABSENCE",
      studentId: student.id,
      studentName: student.fullName,
      specificSlotId,
    });
  };

  const handleRecoverSlot = (specificSlotId: string) => {
    setSlotAction({
      type: "RECOVER",
      specificSlotId,
    });
  };
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
  const handleConfirmRecover = async (
    studentId: string,
    specificSlotId: string,
  ) => {
    return recoverSlot({ studentId, specificSlotId }).unwrap();
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

  const STATUS_ICONS: { [key: string]: string } = {
    FINALIZED: CheckIcon,
    IN_PROGRESS: ProgressIcon,
  };

  const ActionsSkeleton = ({ specificSlotId }: { specificSlotId: string }) => {
    return (
      <s.ActionsContainer>
        <s.Action>Buscar</s.Action>
        <s.TooltipContainer onClick={() => handleRecoverSlot(specificSlotId)}>
          <img src={PlusIcon} alt="Añadir alumno" />
          <s.Tooltip>Añadir alumno</s.Tooltip>
        </s.TooltipContainer>

        <s.Action>Cancelar</s.Action>
      </s.ActionsContainer>
    );
  };

  const SlotInfoSkeleton = (slot: SpecificSlotResponse) => {
    return (
      <s.SlotInfoContainer>
        <s.SlotCapacity $isFull={slot.capacity === slot.maxCapacity}>
          <img
            src={UserIcon}
            alt="Capacity"
            style={{
              width: 16,
              height: 16,
              marginRight: 2,
              filter: "brightness(0) invert(1)",
            }}
          />
          {slot.capacity} / {slot.maxCapacity}
        </s.SlotCapacity>
        <s.SlotStatus $status={slot.status}>
          {STATUS_ICONS[slot.status] && (
            <img
              src={STATUS_ICONS[slot.status]}
              alt="Status"
              style={{ width: 12, height: 12, marginRight: 3 }}
            />
          )}
          {StatesTranslation[slot.status]}
        </s.SlotStatus>
      </s.SlotInfoContainer>
    );
  };

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
                <s.SpecificSlot
                  $isNull={!slot}
                  key={rowIndex}
                  $columnsCount={columnsCount}
                >
                  {slot && (
                    <>
                      <ActionsSkeleton specificSlotId={slot.id} />
                      <SlotInfoSkeleton {...slot} />
                      <s.SlotStudentsContainer>
                        {slot?.students?.map((student) => {
                          const isAbsent = student.status === "ABSENCE";
                          return (
                            <s.StudentName
                              key={student.id}
                              title={student.fullName}
                              onClick={() =>
                                handleAbsenceSlot(student, slot.id)
                              }
                            >
                              {isAbsent && <s.AbsenceBadge>A</s.AbsenceBadge>}

                              <s.StudentText $isAbsent={isAbsent}>
                                {student.fullName}
                              </s.StudentText>
                            </s.StudentName>
                          );
                        })}
                      </s.SlotStudentsContainer>
                    </>
                  )}
                </s.SpecificSlot>
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
          students={studentsToRecover}
          availableCapacity={availableCapacity}
          selectedSlotId={slotAction?.specificSlotId || null}
          onClose={closeModals}
          onConfirm={handleConfirmRecover}
        />
      </s.CalendarContainer>
    </s.MainContainer>
  );
}
export default CalendarView;

import * as s from "./CalendarViewPage.styles";
import { useGetCalendarViewQuery } from "../../app/services/UserService";
import { useMarkStudentAbsenceMutation } from "../../app/services/StudentService";
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
import { useState } from "react";
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
  | { type: "RECOVER"; specificSlotId: string; availableCapacity: number };
function CalendarView() {
  const { userId } = useAuthentication();

  const [markAbsence] = useMarkStudentAbsenceMutation();

  const { data: calendarData } = useGetCalendarViewQuery({
    userId: userId!,
    date: formatDateToIsoString(new Date()),
    typeOfView: CalendarViewName.WEEKLY,
  });

  const [slotAction, setSlotAction] = useState<CalendarAction | null>(null);

  const handleAbsenceSlot = (student: Student, specificSlotId: string) => {
    setSlotAction({
      type: "ABSENCE",
      studentId: student.id,
      studentName: student.fullName,
      specificSlotId,
    });
  };

  const handleRecoverSlot = (
    specificSlotId: string,
    availableCapacity: number,
  ) => {
    setSlotAction({
      type: "RECOVER",
      specificSlotId,
      availableCapacity,
    });
  };
  const closeModal = () => setSlotAction(null);
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

  const ActionsSkeleton = ({
    specificSlot,
    isFull,
  }: {
    specificSlot: SpecificSlotResponse;
    isFull: boolean;
  }) => {
    return (
      <s.ActionsContainer>
        <s.Action>Buscar</s.Action>
        <s.TooltipContainer
          $disabled={isFull}
          onClick={() =>
            handleRecoverSlot(
              specificSlot.id,
              specificSlot.maxCapacity - specificSlot.capacity,
            )
          }
        >
          <img src={PlusIcon} alt="Añadir alumno" />
          <s.Tooltip>{isFull ? "Cupo lleno" : "Añadir alumno"}</s.Tooltip>
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
                      <ActionsSkeleton
                        specificSlot={slot}
                        isFull={slot.maxCapacity == slot.capacity}
                      />
                      <SlotInfoSkeleton {...slot} />
                      <s.SlotStudentsContainer>
                        {slot?.students?.map((student) => {
                          const isAbsent = student.status === "ABSENCE";
                          const isRecover = student.status === "RECOVERED";
                          return (
                            <s.StudentName
                              key={student.id}
                              title={student.fullName}
                              onClick={() =>
                                handleAbsenceSlot(student, slot.id)
                              }
                            >
                              {isAbsent && <s.AbsenceBadge>A</s.AbsenceBadge>}
                              {isRecover && <s.RecoverBadge>R</s.RecoverBadge>}
                              <s.StudentText
                                $isAbsent={isAbsent}
                                $isRecover={isRecover}
                              >
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
        {slotAction && slotAction.type === "RECOVER" && (
          <StudentRecover
            selectedSlotId={slotAction.specificSlotId}
            availableCapacity={slotAction.availableCapacity}
            onClose={closeModal}
          />
        )}
      </s.CalendarContainer>
    </s.MainContainer>
  );
}
export default CalendarView;

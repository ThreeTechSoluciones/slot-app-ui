import {
  MainContainer,
  DayColumn,
  SpecificSlot,
  ActionsContainer,
  Action,
  Tooltip,
  TooltipContainer,
  NoResponseContainer,
  CalendarContainer,
  SlotInfoContainer,
  SlotStatus,
  SlotStudentsContainer,
  StudentName,
  StudentText,
  ScheduledTime,
  Number,
  DayContainer,
  DayOfWeek,
  TimeSlot,
  SlotCapacity,
  AbsenceBadge,
} from "./CalendarViewPage.styles";
import { useGetCalendarViewQuery } from "../../app/services/UserService";
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

  const columnsCount = calendarData?.days.length || 0;
  if (columnsCount === 0) {
    return (
      <NoResponseContainer>
        <SearchNotFound />
      </NoResponseContainer>
    );
  }

  const STATUS_ICONS: { [key: string]: string } = {
    FINALIZED: CheckIcon,
    IN_PROGRESS: ProgressIcon,
  };

  const ActionsSkeleton = ({ specificSlotId }: { specificSlotId: string }) => {
    return (
      <ActionsContainer>
        <Action>Buscar</Action>
        <TooltipContainer onClick={() => handleRecoverSlot(specificSlotId)}>
          <img src={PlusIcon} alt="Añadir alumno" />
          <Tooltip>Añadir alumno</Tooltip>
        </TooltipContainer>

        <Action>Cancelar</Action>
      </ActionsContainer>
    );
  };

  const SlotInfoSkeleton = (slot: SpecificSlotResponse) => {
    return (
      <SlotInfoContainer>
        <SlotCapacity $isFull={slot.capacity === slot.maxCapacity}>
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
        </SlotCapacity>
        <SlotStatus $status={slot.status}>
          {STATUS_ICONS[slot.status] && (
            <img
              src={STATUS_ICONS[slot.status]}
              alt="Status"
              style={{ width: 12, height: 12, marginRight: 3 }}
            />
          )}
          {StatesTranslation[slot.status]}
        </SlotStatus>
      </SlotInfoContainer>
    );
  };

  return (
    <MainContainer>
      <CalendarContainer $columnsCount={columnsCount}>
        <ScheduledTime>
          {calendarData?.times.map((timeSlot) => (
            <TimeSlot key={timeSlot.startTime}>
              {timeSlot.startTime} <br /> - <br />
              {timeSlot.endTime}
            </TimeSlot>
          ))}
        </ScheduledTime>
        {calendarData?.days.map((day, colIndex) => (
          <DayColumn key={day.dayOfWeek}>
            <DayContainer>
              <DayOfWeek>{DaysOfWeekTranslation[day.dayOfWeek]}</DayOfWeek>
              <Number>{day.numberOfDay}</Number>
            </DayContainer>
            {calendarData?.times.map((_, rowIndex) => {
              const slot = calendarData.slots[rowIndex][colIndex];
              return (
                <SpecificSlot
                  $isNull={!slot}
                  key={rowIndex}
                  $columnsCount={columnsCount}
                >
                  {slot && (
                    <>
                      <ActionsSkeleton specificSlotId={slot.id} />
                      <SlotInfoSkeleton {...slot} />
                      <SlotStudentsContainer>
                        {slot?.students?.map((student) => {
                          const isAbsent = student.status === "ABSENCE";
                          return (
                            <StudentName
                              key={student.id}
                              title={student.fullName}
                              onClick={() =>
                                handleAbsenceSlot(student, slot.id)
                              }
                            >
                              {isAbsent && <AbsenceBadge>A</AbsenceBadge>}

                              <StudentText $isAbsent={isAbsent}>
                                {student.fullName}
                              </StudentText>
                            </StudentName>
                          );
                        })}
                      </SlotStudentsContainer>
                    </>
                  )}
                </SpecificSlot>
              );
            })}
          </DayColumn>
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
          calendarData={calendarData}
          selectedSlotId={slotAction?.specificSlotId || null}
          onClose={closeModals}
          onConfirm={handleConfirmRecover}
        />
      </CalendarContainer>
    </MainContainer>
  );
}
export default CalendarView;

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
  RecoverContainer,
  RecoverSubtitle,
  RecoverList,
  RecoverItem,
  RecoverItemLeft,
  RecoverCheckbox,
  RecoverBadge,
  RecoverStudentName,
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
import { StatesTranslation } from "./StatesTranslation";
import { CalendarViewName } from "../../app/types/models/CalendarViewName";
import type {
  CalendarResponse,
  SpecificSlotResponse,
  Student,
} from "../../app/types/responses/CalendarResponse.type";
import { SearchNotFound } from "../../components/search_not_found/SearchNotFound";
import { useState } from "react";
import { GenericModal } from "../../components/generic_modal/GenericModal";
import { toast } from "react-hot-toast";
import { formatDateToIsoString } from "../../utils/DateFormatter";
type AbsenceAction = {
  type: "ABSENCE";
  studentId: string;
  studentName: string;
  specificSlotId: string;
};

type RecoverAction = {
  type: "RECOVER";
  specificSlotId: string;
  studentId?: string;
  studentName?: string;
  absenceSlotId: string;
  recoverSlotId?: string;
};

type SlotActionData = AbsenceAction | RecoverAction;

function CalendarView() {
  const { userId } = useAuthentication();

  const [markAbsence] = useMarkStudentAbsenceMutation();
  const [recoverSlot] = useRecoverStudentSlotMutation();

  const { data: calendarData } = useGetCalendarViewQuery({
    userId: userId!,
    date: formatDateToIsoString(new Date()),
    typeOfView: CalendarViewName.WEEKLY,
  });

  const [slotAction, setSlotAction] = useState<SlotActionData | null>(null);
  const [recoverSlotId, setRecoverSlotId] = useState<string | null>(null);

  const handleAbsenceSlot = (student: Student, specificSlotId: string) => {
    setSlotAction({
      type: "ABSENCE",
      studentId: student.id,
      studentName: student.fullName,
      specificSlotId,
    });
  };
  // Devuelve todos los alumnos que tienen ausencias pendientes en otros turnos
  const getPendingRecoveries = (
    calendarData: CalendarResponse,
    currentSlotId: string,
  ) => {
    const studentsMap: Record<string, Student> = {};

    calendarData.slots.flat().forEach((slot) => {
      if (!slot) return;

      slot.students.forEach((student) => {
        if (student.status === "ABSENCE") {
          // solo los alumnos que aún no se han recuperado en este slot
          studentsMap[student.id] = {
            id: student.id,
            fullName: student.fullName,
            status: student.status,
          };
        }
      });
    });

    return Object.values(studentsMap);
  };

  const handleSelectRecoverStudent = (student: Student) => {
    setSlotAction((prev) =>
      prev
        ? { ...prev, studentId: student.id, studentName: student.fullName }
        : {
            type: "RECOVER",
            specificSlotId: recoverSlotId!,
            studentId: student.id,
            studentName: student.fullName,
            absenceSlotId: "",
          },
    );
  };
  const handleRecoverSlot = (specificSlotId: string) => {
    setSlotAction({
      type: "RECOVER",
      specificSlotId,
      absenceSlotId: "",
    });
  };

  const handleConfirmSlotAction = () => {
    if (!slotAction) return;

    if (slotAction.type === "ABSENCE") {
      markAbsence({
        studentId: slotAction.studentId,
        specificSlotId: slotAction.specificSlotId,
      })
        .unwrap()
        .then(() => {
          toast.success("Se ha registrado la inasistencia");
        })
        .finally(() => {
          setSlotAction(null);
        });
    }

    if (slotAction.type === "RECOVER") {
      recoverSlot({
        studentId: slotAction.studentId!,
        specificSlotId: slotAction.specificSlotId,
      })
        .unwrap()
        .then(() => {
          toast.success("El/los alumnos ha/han sido registrado/s");
        })
        .finally(() => {
          setSlotAction(null);
          setRecoverSlotId(null);
        });
    }
  };
  const selectedSlot = calendarData?.slots
    .flat()
    .find((slot): slot is SpecificSlotResponse =>
      Boolean(slot && slot.id === slotAction?.specificSlotId),
    );

  const absentStudents: Student[] =
    slotAction?.type === "RECOVER" && calendarData
      ? getPendingRecoveries(calendarData, slotAction.specificSlotId)
      : [];

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
            onCancel={() => setSlotAction(null)}
            onConfirm={handleConfirmSlotAction}
            confirmText="Registrar Inasistencia"
            cancelText="Cancelar"
            width="480px"
            height="226px"
          ></GenericModal>
        )}
        {slotAction?.type === "RECOVER" && (
          <GenericModal
            title="AGREGAR ALUMNO"
            isConfirmModal
            onCancel={() => setSlotAction(null)}
            onConfirm={handleConfirmSlotAction}
            confirmText="Registrar"
            cancelText="Cancelar"
            width="480px"
            height="auto"
          >
            <RecoverContainer>
              <RecoverSubtitle>
                Capacidad disponible:
                {selectedSlot?.maxCapacity! - selectedSlot?.capacity!}
              </RecoverSubtitle>

              <RecoverList>
                {absentStudents.map((student) => {
                  const selected = slotAction.studentId === student.id;

                  return (
                    <RecoverItem
                      key={student.id}
                      $selected={selected}
                      onClick={() => handleSelectRecoverStudent(student)}
                    >
                      <RecoverItemLeft>
                        <RecoverCheckbox $checked={selected}>
                          <img src={CheckIcon} />
                        </RecoverCheckbox>
                        <RecoverStudentName>
                          {student.fullName}
                        </RecoverStudentName>
                      </RecoverItemLeft>

                      <RecoverBadge>1</RecoverBadge>
                    </RecoverItem>
                  );
                })}
              </RecoverList>
            </RecoverContainer>
          </GenericModal>
        )}
      </CalendarContainer>
    </MainContainer>
  );
}
export default CalendarView;

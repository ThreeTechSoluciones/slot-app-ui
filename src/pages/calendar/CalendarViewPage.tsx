import {
  MainContainer,
  DayColumn,
  SpecificSlot,
  ActionsContainer,
  Action,
  NoResponseContainer,
  CalendarContainer,
  SlotInfoContainer,
  SlotStatus,
  SlotStudentsContainer,
  StudentName,
  ScheduledTime,
  Number,
  DayContainer,
  DayOfWeek,
  TimeSlot,
  SlotCapacity,
} from "./CalendarViewPage.styles";
import { useGetCalendarViewQuery } from "../../app/services/UserService";
import { useMarkStudentAbsenceMutation } from "../../app/services/StudentService";
import CheckIcon from "../../assets/check.svg";
import useAuthentication from "../../hooks/useAuthentication";
import UserIcon from "../../assets/white-user-icon.svg";
import ProgressIcon from "../../assets/progress-icon.svg";
import StudentIcon from "../../assets/student-icon.svg";
import { DaysOfWeekTranslation } from "../../utils/DaysOfWeek";
import { StatesTranslation } from "./StatesTranslation";
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

interface AbsenceData {
  studentId: string;
  studentName: string;
  specificSlotId: string;
}

function CalendarView() {
  const { userId } = useAuthentication();

  const [markAbsence] = useMarkStudentAbsenceMutation();

  const { data: calendarData } = useGetCalendarViewQuery({
    userId: userId!,
    date: formatDateToIsoString(new Date()),
    typeOfView: CalendarViewName.WEEKLY,
  });

  const [absenceData, setAbsenceData] = useState<AbsenceData | null>(null);

  const handleStudentClick = (student: Student, specificSlotId: string) => {
    setAbsenceData({
      studentId: student.id,
      studentName: student.fullName,
      specificSlotId,
    });
  };

  const handleConfirmAbsence = async (absenceData: AbsenceData) => {
    markAbsence({
      studentId: absenceData.studentId,
      specificSlotId: absenceData.specificSlotId,
    })
      .unwrap()
      .then(() => {
        toast.success("Se ha registrado la inasistencia");
      })
      .finally(() => {
        setAbsenceData(null);
      });
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

  const ActionsSkeleton = () => {
    return (
      <ActionsContainer>
        <Action>Buscar</Action>
        <Action>Cancelar</Action>
        <Action>Agregar</Action>
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
              const slot = calendarData?.slots[rowIndex][colIndex];
              return (
                <SpecificSlot
                  $isNull={!slot}
                  key={rowIndex}
                  $columnsCount={columnsCount}
                >
                  {slot && (
                    <>
                      <ActionsSkeleton />
                      <SlotInfoSkeleton {...slot} />
                      <SlotStudentsContainer>
                        {slot?.students?.map((student) => (
                          <StudentName
                            key={student.id}
                            title={student.fullName}
                          >
                            {student.fullName}
                          </StudentName>
                        ))}
                      </SlotStudentsContainer>
                    </>
                  )}
                </SpecificSlot>
              );
            })}
          </DayColumn>
        ))}

        {absenceData && (
          <GenericModal
            icon={StudentIcon}
            title={absenceData.studentName}
            isConfirmModal={true}
            onCancel={() => setAbsenceData(null)}
            onConfirm={() => handleConfirmAbsence(absenceData)}
            confirmText="Registrar Inasistencia"
            cancelText="Cancelar"
            width="480px"
            height="226px"
            confirmVariant="primary"
          ></GenericModal>
        )}
      </CalendarContainer>
    </MainContainer>
  );
}

export default CalendarView;

import {
  MainContainer,
  DayColumn,
  SpecificSlot,
  ActionsContainer,
  Action,
  SlotInfoContainer,
  SlotStatus,
  SlotStudentsContainer,
  StudentName,
  ScheduledTime,
  Title,
  TitleContainer,
  SecondaryContainer,
  Number,
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
import { getLayoutConfig } from "./CalendarResponsiveConfig";
import { SearchNotFound } from "../../components/search_not_found/SearchNotFound";
import { useState } from "react";
import { GenericModal } from "../../components/generic_modal/GenericModal";
import { toast } from "react-hot-toast";

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
    date: "2026-01-20",
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

  const columnsCount = calendarData?.days?.length || 0;
  if (columnsCount === 0) {
    return <SearchNotFound />;
  }

  const layout = getLayoutConfig(columnsCount);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "FINALIZED":
        return CheckIcon;
      case "IN_PROGRESS":
        return ProgressIcon;
      default:
        return undefined;
    }
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

  const SlotInfoSkeleton = ({ slot }: { slot: SpecificSlotResponse }) => {
    return (
      <SlotInfoContainer>
        <SlotCapacity $isFull={slot.capacity === slot.maxCapacity}>
          <img
            src={UserIcon}
            alt="Capacity"
            style={{ width: 16, height: 16, marginRight: 2 }}
          />
          {slot.capacity} / {slot.maxCapacity}
        </SlotCapacity>
        <SlotStatus
          $isFinalized={slot.status === "FINALIZED"}
          $isInProgress={slot.status === "IN_PROGRESS"}
        >
          <img
            src={getStatusIcon(slot.status)}
            alt="Status"
            style={{ width: 12, height: 12, marginRight: 3 }}
          />
          {StatesTranslation[slot.status]}
        </SlotStatus>
      </SlotInfoContainer>
    );
  };

  return (
    <MainContainer
      style={
        {
          "--slot-width": layout.slotWidth,
          "--padding-left": layout.paddingLeft,
          "--margin-info-left": layout.marginInfoLeft,
          "--margin-student-left": layout.marginStudentLeft,
          "--student-width": layout.studentWidth,
          "--overflowX": layout.overflowX,
          "--padding": layout.padding,
        } as React.CSSProperties
      }
    >
      <SecondaryContainer>
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
            <TitleContainer>
              <Title>{DaysOfWeekTranslation[day.dayOfWeek]}</Title>
              <Number>{day.numberOfDay}</Number>
            </TitleContainer>
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
                      <SlotInfoSkeleton slot={slot} />
                    </>
                  )}
                  <SlotStudentsContainer>
                    {slot?.students?.map((student) => (
                      <StudentName
                        key={student.id}
                        title={student.fullName}
                        onClick={() => handleStudentClick(student, slot.id)}
                      >
                        {student.fullName}
                      </StudentName>
                    ))}
                  </SlotStudentsContainer>
                </SpecificSlot>
              );
            })}
          </DayColumn>
        ))}
      </SecondaryContainer>
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
    </MainContainer>
  );
}

export default CalendarView;

import {
  MainContainer,
  DayColumn,
  SpecificSlot,
  ActionsContainer,
  Action,
  SlotInfoContainer,
  SlotStatus,
  SlotStudentsContainer,
  Student,
  ScheduledTime,
  Title,
  TitleContainer,
  SecondaryContainer,
  Number,
  TimeSlot,
  SlotCapacity
}
  from './CalendarViewPage.styles';
import { useGetCalendarViewQuery } from '../../app/services/UserService';
import CheckIcon from "../../assets/check.svg";
import useAuthentication from '../../hooks/useAuthentication';
import UserIcon from "../../assets/white-user-icon.svg"
import ProgressIcon from "../../assets/progress-icon.svg"
import { DaysOfWeekReverse } from '../../utils/DaysOfWeek';
import { StatesTranslation } from './StatesTranslation';
import { CalendarViewName } from '../../app/types/models/CalendarViewName';
import type { SpecificSlotResponse } from '../../app/types/responses/CalendarResponse.type';
import { SearchNotFound } from '../../components/search_not_found/SearchNotFound';

function CalendarView() {

  const { userId } = useAuthentication();

  const { data: calendarData } = useGetCalendarViewQuery({
    userId: userId!,
    date: '2026-01-26',
    typeOfView: CalendarViewName.WEEKLY
  });

  const columnsCount = calendarData?.days.length || 0;

  if (columnsCount === 0) {
    return <SearchNotFound />;
  }

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
  }

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
        <SlotStatus $isFinalized={slot.status === "FINALIZED"} $isInProgress={slot.status === "IN_PROGRESS"}>
          <img
            src={getStatusIcon(slot.status)}
            alt="Status"
            style={{ width: 12, height: 12, marginRight: 3 }}
          />
          {StatesTranslation[slot.status]}
        </SlotStatus>
      </SlotInfoContainer>
    )
  };

  return (
    <MainContainer>
      <SecondaryContainer $columnsCount={columnsCount}>
        <ScheduledTime>
          {calendarData?.times.map((timeSlot) => (
            <TimeSlot key={timeSlot.startTime}>{timeSlot.startTime} <br /> - <br />{timeSlot.endTime}</TimeSlot>
          ))}
        </ScheduledTime>
        {calendarData?.days.map((day, colIndex) => (
          <DayColumn key={day.dayOfWeek}>
            <TitleContainer>
              <Title>{DaysOfWeekReverse[day.dayOfWeek].toUpperCase()}</Title>
              <Number>{day.numberOfDay}</Number>
            </TitleContainer>
            {calendarData?.times.map((_, rowIndex) => {
              const slot = calendarData.slots[rowIndex][colIndex];
              return (
                <SpecificSlot $isNull={!slot} key={rowIndex} $columnsCount={columnsCount}>
                  {slot && (
                    <>
                      <ActionsSkeleton />
                      <SlotInfoSkeleton slot={slot} />
                    </>
                  )
                  }
                  <SlotStudentsContainer>
                    {slot?.students?.map((student) => (
                      <Student key={student.id} title={student.fullName}>{student.fullName}</Student>))}
                  </SlotStudentsContainer>
                </SpecificSlot>
              );
            })}
          </DayColumn>
        ))}

      </SecondaryContainer>
    </MainContainer >
  );
}
export default CalendarView;
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
  DayOfWeek,
  DayContainer,
  CalendarContainer,
  Number,
  TimeSlot,
  SlotCapacity,
  NoResponseContainer
}
  from './CalendarViewPage.styles';
import { useGetCalendarViewQuery } from '../../app/services/UserService';
import CheckIcon from "../../assets/check.svg";
import useAuthentication from '../../hooks/useAuthentication';
import UserIcon from "../../assets/user-icon.svg"
import ProgressIcon from "../../assets/progress-icon.svg"
import { DaysOfWeekTranslation } from '../../utils/DaysOfWeek';
import { StatesTranslation } from '../../utils/StatesTranslation';
import { CalendarViewName } from '../../app/types/models/CalendarViewName';
import type { SpecificSlotResponse } from '../../app/types/responses/CalendarResponse.type';
import { SearchNotFound } from '../../components/search_not_found/SearchNotFound';
import { formatDateToIsoString } from '../../utils/DateFormatter';

function CalendarView() {

  const { userId } = useAuthentication();

  const { data: calendarData } = useGetCalendarViewQuery({
    userId: userId!,
    date: formatDateToIsoString(new Date()),
    typeOfView: CalendarViewName.WEEKLY
  });

  const columnsCount = calendarData?.days.length || 0;

  if (columnsCount === 0) {
    return (
      <NoResponseContainer>
        <SearchNotFound />
      </NoResponseContainer>
    )
  }

  const STATUS_ICONS: { [key: string]: string } = {
    'FINALIZED': CheckIcon,
    'IN_PROGRESS': ProgressIcon,
  }

  const ActionsSkeleton = () => {
    return (
      <ActionsContainer>
        <Action>Buscar</Action>
        <Action>Cancelar</Action>
        <Action>Agregar</Action>
      </ActionsContainer>
    );
  }

  const SlotInfoSkeleton = (slot: SpecificSlotResponse) => {
    return (
      <SlotInfoContainer>
        <SlotCapacity $isFull={slot.capacity === slot.maxCapacity}>
          <img
            src={UserIcon}
            alt="Capacity"
            style={{ width: 16, height: 16, marginRight: 2, filter: "brightness(0) invert(1)" }}
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
    )
  };

  return (
    <MainContainer>
      <CalendarContainer $columnsCount={columnsCount}>
        <ScheduledTime>
          {calendarData?.times.map((timeSlot) => (
            <TimeSlot key={timeSlot.startTime}>{timeSlot.startTime} <br /> - <br />{timeSlot.endTime}</TimeSlot>
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
                <SpecificSlot $isNull={!slot} key={rowIndex} $columnsCount={columnsCount}>
                  {slot && (
                    <>
                      <ActionsSkeleton />
                      <SlotInfoSkeleton {...slot} />
                      <SlotStudentsContainer>
                        {slot?.students?.map((student) => (
                          <Student key={student.id} title={student.fullName}>{student.fullName}</Student>
                        ))}
                      </SlotStudentsContainer>
                    </>
                  )}
                </SpecificSlot>
              );
            })}
          </DayColumn>
        ))}
      </CalendarContainer>
    </MainContainer >
  );
}
export default CalendarView;
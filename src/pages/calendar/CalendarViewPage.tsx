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
import { calendarMock } from './CalendarMock';
import CheckIcon from "../../assets/check.svg";

import { useGetCalendarViewQuery } from '../../app/services/UserService';
import useAuthentication from '../../hooks/useAuthentication';
import UserIcon from "../../assets/white-user-icon.svg"
import ProgressIcon from "../../assets/progress-icon.svg"
import { TranslatorDaysOfWeek } from '../../utils/DaysOfWeek';
import { StatesTranslation } from './StatesTranslation';

function CalendarView() {


  const { userId } = useAuthentication();
  const { data: calendarData } = useGetCalendarViewQuery({
    userId: userId!,
    date: '2026-01-20',
    typeOfView: 'WEEKLY'
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "FINALIZED":
        return CheckIcon;
      case "IN_PROGRESS":
        return ProgressIcon;
      default:
        return "";
    }
  };



  return (
    <MainContainer>
      <SecondaryContainer>
        <ScheduledTime>
          {calendarMock.times.map((timeSlot) => (
            <TimeSlot key={timeSlot.startTime}>{timeSlot.startTime} <br /> - <br />{timeSlot.endTime}</TimeSlot>
          ))}
        </ScheduledTime>
        {calendarMock.days.map((day, colIndex) => (
          <DayColumn key={day.dayOfWeek}>
            <TitleContainer>
              <Title>{TranslatorDaysOfWeek[day.dayOfWeek]}</Title>
              <Number>{day.numberOfDay}</Number>
            </TitleContainer>
            {calendarMock.times.map((_, rowIndex) => {

              const slot = calendarMock.slots[rowIndex][colIndex];

              return (
                <SpecificSlot $isNull={!slot} key={rowIndex}>
                  {slot && (
                    <>
                      <ActionsContainer>
                        <Action>Buscar</Action>
                        <Action>Cancelar</Action>
                        <Action>Agregar</Action>
                      </ActionsContainer>

                      <SlotInfoContainer>
                        <SlotCapacity $isFull={slot.capacity === slot.maxCapacity}>
                          <img
                            src={UserIcon}
                            alt="Finalizado"
                            style={{ width: 16, height: 16, marginRight: 2 }}
                          />
                          {slot.capacity} / {slot.maxCapacity}
                        </SlotCapacity>
                        <SlotStatus $isFinalized={slot.status === "FINALIZED"} $isInProgress={slot.status === "IN_PROGRESS"}>
                          <img
                            src={getStatusIcon(slot.status)}
                            alt="Status"
                            style={{ width: 14, height: 14, marginRight: 6 }}
                          />
                          {StatesTranslation[slot.status]}
                        </SlotStatus>
                      </SlotInfoContainer>
                    </>
                  )
                  }
                  <SlotStudentsContainer>
                    {slot?.students?.map((student) => (
                      <Student key={student.id}>{student.fullName}</Student>))}
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
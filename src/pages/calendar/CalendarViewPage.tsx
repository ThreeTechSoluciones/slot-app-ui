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
  NoResponseContainer,
  NavigationArrow,
  NavigationDateContainer,
  CustomDisplay
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
import InputDate from '../../components/date/inputDate';
import CalendarIcon from "../../assets/CalenderIcon.png";
import BackIcon from "../../assets/back-arrow-icon.svg";
import NextIcon from "../../assets/next-arrow-icon.svg";
import { useState } from 'react';
import { CalendarMonth } from '../../utils/MonthsOfYear';


function CalendarView() {

  const [selectDate, setSelectDate] = useState<Date>(new Date());

  const { userId } = useAuthentication();

  const calculateWeek = (days: number) => {
    const week = new Date(selectDate!);
    setSelectDate(new Date((week.setDate(week.getDate() + days))));
  }

  const calendarPlaceholder = () => {
    const month = CalendarMonth[selectDate!.getMonth()];
    const year = selectDate!.getFullYear();
    return `${month} ${year}`;
  }

  const { data: calendarData } = useGetCalendarViewQuery({
    userId: userId!,
    date: formatDateToIsoString(selectDate!),
    typeOfView: CalendarViewName.WEEKLY
  });

  const columnsCount = calendarData?.days.length || 0;

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

  const SelectDateContainer = () => {
    return (<NavigationDateContainer>
      <NavigationArrow onClick={() => calculateWeek(-7)}>
        <img src={BackIcon} style={{ marginLeft: "8px" }}></img>
      </NavigationArrow>
      <div style={{ position: 'relative' }}>
        <CustomDisplay>{calendarPlaceholder()}</CustomDisplay>
        <InputDate
          value={selectDate}
          onChange={(date) => {
            if (date instanceof Date) {
              setSelectDate(date);
            }
          }}
          format="dd/MM/yyyy"
          calendarPosition="top"
          width="408px"
          locale="es-ES"
          clearIcon={null}
          calendarIcon={
            <img
              src={CalendarIcon}
              alt="Calendario"
              style={{ width: 20, height: 20 }}
            />
          }
        />
      </div>
      <NavigationArrow onClick={() => calculateWeek(7)}><img src={NextIcon}></img>
      </NavigationArrow>
    </NavigationDateContainer>
    )
  }

  if (columnsCount === 0) {
    return (
      <NoResponseContainer>
        <SelectDateContainer />
        <SearchNotFound />
      </NoResponseContainer>
    )
  }

  return (
    <MainContainer>
      <SelectDateContainer />
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


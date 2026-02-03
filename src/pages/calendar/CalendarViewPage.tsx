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
import * as s from './CalendarViewPage.styles';

function CalendarView() {

  const [selectDate, setSelectDate] = useState<Date>(new Date());

  const { userId } = useAuthentication();

  const calculateWeek = (days: number) => {
    setSelectDate(new Date(selectDate.setDate(selectDate.getDate() + days)));
  }

  const calendarPlaceholder = () => {
    const month = CalendarMonth[selectDate!.getMonth()];
    const year = selectDate!.getFullYear();
    return `${month} ${year}`;
  }

  const { data: calendarData } = useGetCalendarViewQuery({
    userId: userId!,
    date: formatDateToIsoString(selectDate),
    typeOfView: CalendarViewName.WEEKLY
  });

  const columnsCount = calendarData?.days.length || 0;

  const STATUS_ICONS: { [key: string]: string } = {
    'FINALIZED': CheckIcon,
    'IN_PROGRESS': ProgressIcon,
  }

  const ActionsSkeleton = () => {
    return (
      <s.ActionsContainer>
        <s.Action>Buscar</s.Action>
        <s.Action>Cancelar</s.Action>
        <s.Action>Agregar</s.Action>
      </s.ActionsContainer>
    );
  }

  const SlotInfoSkeleton = (slot: SpecificSlotResponse) => {
    return (
      <s.SlotInfoContainer>
        <s.SlotCapacity $isFull={slot.capacity === slot.maxCapacity}>
          <img
            src={UserIcon}
            alt="Capacity"
            style={{ width: 16, height: 16, marginRight: 2, filter: "brightness(0) invert(1)" }}
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
    )
  };

  const SelectDateContainer = () => {
    return (
      <s.NavigationDateContainer>
        <s.NavigationArrow onClick={() => calculateWeek(-7)}>
          <img src={BackIcon} style={{ marginLeft: "8px" }} />
        </s.NavigationArrow>
        <s.CustomDisplayContainer>
          <s.CustomDisplay>{calendarPlaceholder()}</s.CustomDisplay>
          <s.InputDateContainer>
            <InputDate
              value={selectDate}
              onChange={(date) => {
                if (date instanceof Date) {
                  setSelectDate(date);
                }
              }}
              format="dd/MM/yyyy"
              calendarPosition="top"
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
          </s.InputDateContainer>
        </s.CustomDisplayContainer>
        <s.NavigationArrow onClick={() => calculateWeek(7)}>
          <img src={NextIcon} />
        </s.NavigationArrow>
      </s.NavigationDateContainer>
    )
  }

  if (columnsCount === 0) {
    return (
      <s.NoResponseContainer>
        <SelectDateContainer />
        <SearchNotFound />
      </s.NoResponseContainer>
    )
  }

  return (
    <s.MainContainer>
      <SelectDateContainer />
      <s.CalendarContainer $columnsCount={columnsCount}>
        <s.ScheduledTime>
          {calendarData?.times.map((timeSlot) => (
            <s.TimeSlot key={timeSlot.startTime}>{timeSlot.startTime} <br /> - <br />{timeSlot.endTime}</s.TimeSlot>
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
                <s.SpecificSlot $isNull={!slot} key={rowIndex} $columnsCount={columnsCount}>
                  {slot && (
                    <>
                      <ActionsSkeleton />
                      <SlotInfoSkeleton {...slot} />
                      <s.SlotStudentsContainer>
                        {slot?.students?.map((student) => (
                          <s.Student key={student.id} title={student.fullName}>{student.fullName}</s.Student>
                        ))}
                      </s.SlotStudentsContainer>
                    </>
                  )}
                </s.SpecificSlot>
              );
            })}
          </s.DayColumn>
        ))}
      </s.CalendarContainer>
    </s.MainContainer >
  );
}
export default CalendarView;


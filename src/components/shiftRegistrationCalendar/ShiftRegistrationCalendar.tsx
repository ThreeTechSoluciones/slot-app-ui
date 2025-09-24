import { shiftRegistrationCalendarData } from "./ShiftRegistrationCalendarData";
import { MainContainer, 
        Column,
        Day,
        Hour
      } from "./ShiftRegistrationCalendar.styles";
import { SUCCESS_COLOR } from "../../utils/Stylesheet";


const maxTurnos = Math.max(...shiftRegistrationCalendarData.map(day => day.shifts.length)); 

type CalenderProps = {
  selectedShifts: { id: string }[];
  onSeleccionTurno: (id: string, day: string, hour: string) => void;
  onDeleteShift: (id: string, day: string, hour: string) => void;
}

function Calender({
      selectedShifts,
      onSeleccionTurno,
      onDeleteShift,
    }: CalenderProps) {
  
      return (
        <MainContainer>
        {shiftRegistrationCalendarData.map((day) => (
          <Column key={day.day}>
            <Day>{day.day}</Day>
            {Array.from({ length: maxTurnos }).map((_, idx) => {
            const shift = day.shifts[idx];
            //caso 1 (que no exista el turno o que el turno exista pero está ocupado)
            if (!shift || shift.status==="Unavailable"){ 
            return (
              <Hour isUnavailable key={idx} type="button" ></Hour>
            )
            };
            //caso 2 (que el turno exista y esté habilitado. En este caso podemos seleccionarlo y deseleccionarlo)
            const isSelected = selectedShifts.some(s => s.id === shift.id);
            return (
              <Hour isAvailable type="button" key={shift.id} onClick={() => {
                if (isSelected) {
                  onDeleteShift(shift.id, day.day, shift.hour); 
                } else {
                  onSeleccionTurno(shift.id, day.day, shift.hour); 
                }
                }}
                style={{ backgroundColor: isSelected ? SUCCESS_COLOR : undefined }}>
                {shift.hour}
              </Hour>
            );
            })}
          </Column>
        ))}
      </MainContainer>
    );
  }
export default Calender;
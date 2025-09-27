import { MainContainer, 
        Column,
        Day,
        Hour,
        WarningContainer
      } from "./ShiftRegistrationCalendar.styles";
import { SUCCESS_COLOR } from "../../utils/Stylesheet";
import type { Shifts } from "../../app/types/responses/ShiftsResponse";


type CalendarProps = {
  selectedShifts: { id: string }[];
  onSelectShift : (id: string, day: string, hour: string) => void;
  onDeleteShift: (id: string, day: string, hour: string) => void;
  listShifts: Shifts[];
}

function ShiftRegistrationCalendar({
      selectedShifts,
      onSelectShift ,
      onDeleteShift,
      listShifts,
    }: CalendarProps) {

  const maxTurnos = Math.max(...listShifts.map(day => day.shifts.length)); 
  
  return (
    <MainContainer>
      {listShifts.length > 0 ? (
      listShifts.map((day) => (
        <Column key={day.day}>
          <Day>{day.day}</Day>
            {Array.from({ length: maxTurnos }).map((_, idx) => {
            const shift = day.shifts[idx];
            //caso 1 (que no exista el turno o que el turno exista pero está ocupado)
            if (!shift || shift.status==="Unavailable"){ 
              return (
                <Hour key={idx} type="button" ></Hour>
              )
            };
            //caso 2 (que el turno exista y esté habilitado. En este caso podemos seleccionarlo y deseleccionarlo)
            const isSelected = selectedShifts.some(s => s.id === shift.id);
            return (
              <Hour $isAvailable type="button" key={shift.id} onClick={() => {
              if (isSelected) {
                  onDeleteShift(shift.id, day.day, shift.hour); 
              } else {
                  onSelectShift (shift.id, day.day, shift.hour); 
                }
              }}
              style={{ backgroundColor: isSelected ? SUCCESS_COLOR : undefined }}>
              {shift.hour}
              </Hour>
            );
            })}
          </Column>
        ))
      ):(
        <WarningContainer>
          <p>No hay turnos cargados</p>
        </WarningContainer>
      )}
    </MainContainer>
  );
}
export default ShiftRegistrationCalendar;
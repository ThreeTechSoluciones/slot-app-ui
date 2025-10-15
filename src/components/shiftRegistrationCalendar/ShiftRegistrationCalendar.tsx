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
  return (
    <MainContainer>
      {listShifts.length > 0 ? 
        <Shifts 
          selectedShifts={selectedShifts}
          onSelectShift={onSelectShift}
          onDeleteShift={onDeleteShift}
          listShifts={listShifts}
        /> : 
        <WarningMessage />
      }
    </MainContainer>
  );
}
export default ShiftRegistrationCalendar;
const WarningMessage = () => (
  <WarningContainer>
    No hay turnos disponibles para los próximos días.
  </WarningContainer>
);
const Shifts = ({
  selectedShifts,
  onSelectShift ,
  onDeleteShift,
  listShifts,
}: CalendarProps ) => {
  const maxTurnos = Math.max(...listShifts.map(day => day.shifts.length)); 
  return (
    listShifts.map((day) => (
      <Column key={day.day}>
        <Day>{day.day}</Day>
        {
          Array.from({ length: maxTurnos }).map((_, idx) => {
            const shift = day.shifts[idx];
            const isSelected = selectedShifts.some(s => s.id === (shift && shift.id));
            const isAvailable = shift && shift.status === "Available";
            return (
              <Hour 
                $isAvailable={isAvailable}
                type="button" 
                key={shift ? `key-${shift.id}` : `empty-${idx}`}
                onClick={() => isSelected ? onDeleteShift(shift.id, day.day, shift.hour) : onSelectShift(shift.id, day.day, shift.hour)} 
                disabled={!isAvailable}
                style={{ backgroundColor: isSelected ? SUCCESS_COLOR : undefined }}
              >
                {shift ? shift.hour : ""}
              </Hour>
            );
          })
        }
      </Column>
    ))
  )
}

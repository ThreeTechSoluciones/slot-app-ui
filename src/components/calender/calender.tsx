import { calenderData } from "./calenderData"
import { Column, MainContainer, Day, Hora} from "./calender.styles"
import { useShiftHandler } from "./ShiftHandler";
import { SUCCESS_COLOR } from "../../utils/Stylesheet";

//pasar directamente el id del turno, ponerlo como key en el button

const maxTurnos = Math.max(...calenderData.map(day => day.shifts.length)); 

function Calender({
      selectedShifts,
      onSeleccionTurno,
      onEliminarTurno
    }: {
      selectedShifts: { id: string }[];
      onSeleccionTurno: (id: string, day: string, hour: string) => void;
      onEliminarTurno: (id: string, day: string, hour: string) => void;
    }) {

      

  return (
    <MainContainer>
      {calenderData.map((day) => (
        <Column key={day.day}>
          <Day>{day.day}</Day>
          {Array.from({ length: maxTurnos }).map((_, idx) => {
            const shift = day.shifts[idx];
            const isSelected = selectedShifts.some(s => s.id === shift.id);
            return shift ? (
              <Hora key={shift.id} onClick={() => {
                if (isSelected) {
                  onEliminarTurno(shift.id, day.day, shift.hour); 
                } else {
                  onSeleccionTurno(shift.id, day.day, shift.hour); 
                }
              }}
              style={{ backgroundColor: isSelected ? SUCCESS_COLOR : undefined }}>
                {shift.hour}
              </Hora>
            ) : (
              <Hora key={idx} style={{ opacity: 0.5, pointerEvents: "none", border: "2px solid gray" }}>
              </Hora>
            );
          })}
        </Column>
      ))}
    </MainContainer>
  );
}
export default Calender;
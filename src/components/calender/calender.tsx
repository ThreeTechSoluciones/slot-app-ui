import { calenderData } from "./calenderData"
import { Column, MainContainer, Day, Hour} from "./calender.styles"
import { SUCCESS_COLOR } from "../../utils/Stylesheet";


const maxTurnos = Math.max(...calenderData.map(day => day.shifts.length)); 

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
    {calenderData.map((day) => (
      <Column key={day.day}>
        <Day>{day.day}</Day>
        {Array.from({ length: maxTurnos }).map((_, idx) => {
        const shift = day.shifts[idx];
        //caso 1 (que no exista el turno)
        if (!shift){
          return (
            <Hour isUnavailable key={idx} type="button" ></Hour>
            )
          }
        //caso 2 (que el turno exista pero está ocupado)
        if (shift.state==="Unavailable"){
          return (
            <Hour  isUnavailable key={idx} type="button"></Hour>
            )
          }
        //caso 3 (que el turno exista y esté habilitado. En este caso podemos seleccionarlo y deseleccionarlo)
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
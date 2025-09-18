import { calenderData } from "./calenderData"
import { Column, MainContainer, Day, Hora} from "./calender.styles"

const maxTurnos = Math.max(...calenderData.map(day => day.turnos.length)); 

function Calender() {
  return (
    <MainContainer>
      {calenderData.map((day) => (
        <Column key={day.dia}>
          <Day>{day.dia}</Day>
          {Array.from({ length: maxTurnos }).map((_, idx) => {
            const turno = day.turnos[idx];
            return turno ? (
              <Hora key={turno}>{turno}</Hora>
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
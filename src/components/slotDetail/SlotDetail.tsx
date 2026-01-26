import {
  ShiftDetailContainer,
  MainTitle,
  ShiftContainer,
  Shift,
  Text,
} from "./SlotDetail.styles";
import CalendarIcon from "../../assets/CalenderIcon.png";

type Slot = {
  id: string;
  day: string;
  hour: string;
};

interface SlotDetailProps {
  slots: Slot[];
  width?: string;
}

function SlotDetail({ slots }: SlotDetailProps) {
  return (
    <ShiftDetailContainer>
      <MainTitle>
        <img src={CalendarIcon} width={"24px"} height={"24px"}></img>Turnos
        asignados
      </MainTitle>
      <ShiftContainer>
        {slots.map((slot) => (
          <Shift key={slot.id}>
            <Text $isADay={true}>{slot.day}</Text>
            <Text>{slot.hour} hs</Text>
          </Shift>
        ))}
      </ShiftContainer>
    </ShiftDetailContainer>
  );
}

export default SlotDetail;

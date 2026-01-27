import {
  SlotDetailContainer,
  MainTitle,
  SlotContainer,
  Slot,
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
    <SlotDetailContainer>
      <MainTitle>
        <img src={CalendarIcon} width={"24px"} height={"24px"}></img>Turnos
        asignados
      </MainTitle>
      <SlotContainer>
        {slots.map((slot) => (
          <Slot key={slot.id}>
            <Text $isADay={true}>{slot.day}</Text>
            <Text>{slot.hour} hs</Text>
          </Slot>
        ))}
      </SlotContainer>
    </SlotDetailContainer>
  );
}

export default SlotDetail;

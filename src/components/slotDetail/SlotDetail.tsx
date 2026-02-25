import { SlotContainer, Slot, Text } from "./SlotDetail.styles";

export type Slot = {
  id: string;
  day: string;
  hour: string;
  status?: string;
  slots?: Slot[];
};

interface SlotDetailProps {
  slots: Slot[];
  width?: string;
}

function SlotDetail({ slots }: SlotDetailProps) {
  return (
    <SlotContainer>
      {slots.map((slot) => (
        <Slot key={slot.id}>
          <Text $isADay={true}>
            {slot.day}
          </Text>
          <Text>{slot.hour} hs</Text>
        </Slot>
      ))}
    </SlotContainer>
  );
}

export default SlotDetail;

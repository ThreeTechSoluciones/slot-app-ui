import {
  ShiftDetailContainer,
  ShiftContainer,
  Shift,
  Text,
} from "./ShiftDetail.styles";

export type Shift = {
  id: string;
  day: string;
  hour: string;
};

interface ShiftDetailProps {
  shifts: Shift[];
  width?: string;
}

function ShiftDetail({ shifts }: ShiftDetailProps) {
  return (
    <ShiftDetailContainer>
      <ShiftContainer>
        {shifts.map((shift) => (
          <Shift key={shift.id}>
            <Text $isADay={true}>{shift.day}</Text>
            <Text>{shift.hour} hs</Text>
          </Shift>
        ))}
      </ShiftContainer>
    </ShiftDetailContainer>
  );
}

export default ShiftDetail;

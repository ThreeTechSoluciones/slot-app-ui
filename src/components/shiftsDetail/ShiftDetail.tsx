import {
  ShiftDetailContainer,
  MainTitle,
  SubTitle,
  ShiftContainer,
  Shift,
  Text,
} from "./ShiftDetail.styles";
import CalenderIcon from "../../assets/CalenderIcon.png";

type Shift = {
  id: string;
  day: string;
  hour: string;
};

interface ShiftDetailProps {
  shifts: Shift[];
  width?: string;
  subtitle?: string;
}

function ShiftDetail({ shifts, subtitle }: ShiftDetailProps) {
  return (
    <ShiftDetailContainer>
      <MainTitle>
        <img src={CalenderIcon} width={"24px"} height={"24px"}></img>Turnos
        asignados
      </MainTitle>
      <SubTitle>
        <strong>Plan asignado</strong> <br /> {subtitle}
      </SubTitle>
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

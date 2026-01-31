import DatePicker from "react-date-picker";
import { StyledWrapper } from "./inputDate.styles";

interface InputDateProps extends React.ComponentProps<typeof DatePicker> {
  calendarPosition?: "bottom" | "top";
}
export default function InputDate({
  calendarPosition = "bottom",
  ...props
}: InputDateProps) {
  return (
    <StyledWrapper $calendarPosition={calendarPosition}>
      <DatePicker {...props} />
    </StyledWrapper>
  );
}
